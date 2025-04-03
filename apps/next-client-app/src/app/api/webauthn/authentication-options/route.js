import {fido} from "@/server/webauthn/fido";
import {NextResponse} from "next/server";
import AES from "crypto-js/aes";

export async function GET() {
    try {
        const authnOptions = await fido.assertionOptions();
        authnOptions.challenge = Buffer.from(authnOptions.challenge);
        authnOptions.success = true;

        const response = await NextResponse.json(authnOptions);
        const sessionData = {
            challenge: authnOptions.challenge
        };
        response.cookies.set({
            name: "challenge",
            value: AES.encrypt(JSON.stringify(sessionData), process.env.JWT_SECRET),
            path: "/",
        });
        return response;
    } catch (e) {
        console.log(e);
        return NextResponse.json({success: false, errorData: e.message},  { status: 500 });
    }
}
