import {NextResponse} from "next/server";
import {fido} from "@/server/webauthn/fido";
import AES from 'crypto-js/aes';
import encUTF8 from 'crypto-js/enc-utf8';
import prisma from "../../../../../next-admin/prisma";

const origin = process.env.ORIGIN_URL;

export async function POST(req) {
    try {
        const sessionCookie = req.cookies.get('challenge').value
        const sessionData = JSON.parse(AES.decrypt(sessionCookie, process.env.JWT_SECRET).toString(encUTF8));
        const challenge = sessionData.challenge;
        const userId = sessionData.userId;

        const {credential} = await req.json();
        const challengeStr = new Uint8Array(challenge.data).buffer;

        credential.rawId = new Uint8Array(Buffer.from(credential.rawId, 'base64')).buffer;

        const attestationExpectations = {
            challenge: challengeStr,
            origin,
            factor: 'either'
        };

        const regResult = await fido.attestationResult(credential, attestationExpectations);
        const passkeys = await prisma.passkey.findFirst({
            where: {
                credentialId: credential.response.id
            }
        }) || [];

        const passkeyData = {
            credentialId: credential.response.id,
            publicKey: regResult.authnrData.get('credentialPublicKeyPem'),
            prevCounter: regResult.authnrData.get('counter'),
            customer:{
                connect: {
                    id: Number(userId)
                }
            }
        };

        if (passkeys.length > 0) {
            await prisma.passkey.updateOne({
                where: {
                    id: passkeys[0].id
                },
                data: passkeyData
            })
        } else {
            await prisma.passkey.create({
                data: passkeyData
            })
        }

        return NextResponse.json(
            {status: 'ok', success: true},
            { status: 200, headers: { "content-type": "application/json" } }
        );
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false, errorData: e.message }, { status: 500 });
    }
}