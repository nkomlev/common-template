import {NextResponse} from "next/server";
import {fido} from "@/server/webauthn/fido";
import AES from "crypto-js/aes";
import encUTF8 from "crypto-js/enc-utf8";
import prisma from "../../../../../next-admin/prisma";

const origin = process.env.ORIGIN_URL;

export async function POST(req) {
    try {
        const sessionCookie = req.cookies.get('challenge').value
        const sessionData = JSON.parse(AES.decrypt(sessionCookie, process.env.JWT_SECRET).toString(encUTF8));
        const challenge = sessionData.challenge;

        const challengeStr = new Uint8Array(challenge.data).buffer;

        const {credential} = await req.json();
        credential.rawId = new Uint8Array(Buffer.from(credential.rawId, 'base64')).buffer;

        const passkey = await prisma.passkey.findFirst({
            where: {
                credentialId: credential.response.id
            }
        });

        if (!passkey) {
            return NextResponse.json({
                    success: false,
                    message: 'Некорректный ключ доступа. Пожалуйста, выполните регистрацию ключа доступа повторно.',
                    errorData: 'Empty passkey set for current user'
                },
                { status: 400 }
            );
        }

        const publicKey = passkey.publicKey;
        const prevCounter = passkey.prevCounter;
        const userId = String(passkey.customerId);

        const userHandle = Buffer.from(userId, c => c.charCodeAt(0));

        if (typeof publicKey === 'undefined' || typeof prevCounter === 'undefined') {
            return NextResponse.json({
                success: false,
                message: 'Некорректный ключ доступа. Пожалуйста, выполните регистрацию ключа доступа повторно.',
                errorData: 'Incorrect passkey data'
            }, {status: 400})
        }

        const assertionExpectations = {
            challenge: challengeStr,
            origin,
            factor: 'either',
            publicKey,
            prevCounter,
            userHandle: new Uint8Array(userHandle).buffer
        };

        try {
            await fido.assertionResult(credential, assertionExpectations); // will throw on error
            return NextResponse.json(
                {status: 'ok', customerId: userId, authenticatorAttachment: credential.authenticatorAttachment},
                {status: 200, headers: {"content-type": "application/json"}}
            );
        } catch (e) {
            console.log(e);
            return NextResponse.json({
                success: false,
                message: 'Некорректный ключ доступа. Пожалуйста, выполните регистрацию ключа доступа повторно.',
                errorData: 'Failed to assert: ' + e.message,
            }, {status: 400});
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: 'Произошла непредвиденная ошибка. Пожалуйста, повторите свое последнее действие',
            errorData: e.message
        }, {status: 500});
    }
}