import {fido} from "@/server/webauthn/fido";
import {NextResponse} from 'next/server';
import AES from 'crypto-js/aes';

export async function GET(req) {
    try {
        const {searchParams} = new URL(req.url);
        const userId = searchParams.get('userId');
        if (!userId) {
            return NextResponse.json({ success: false, message: 'Incorrect userId' }, {status: 500});
        }
        const registrationOptions = await fido.attestationOptions();

        registrationOptions.success = true;
        registrationOptions.user.id = Buffer.from(userId, c => c.charCodeAt(0));
        registrationOptions.challenge = Buffer.from(registrationOptions.challenge);
        registrationOptions.authenticatorSelection = {authenticatorAttachment: 'platform'};

        const response = await NextResponse.json(registrationOptions,
            {status: 200, headers: {"content-type": "application/json"}});
        const sessionData = {
            challenge: registrationOptions.challenge,
            userId: userId
        };
        response.cookies.set({
            name: "challenge",
            value: AES.encrypt(JSON.stringify(sessionData), process.env.JWT_SECRET),
            path: "/",
        });
        return response;
    } catch (e) {
        console.log(e);
        return NextResponse.json({success: false, errorData: e.message}, {status: 500});
    }
}