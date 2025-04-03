import { auth } from "@/server/functions/auth";

const apiUrl = '/api/webauthn';
const bufferToBase64 = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer)));

export const isWebAuthnSupportedOnDevice = async () => {
  if (typeof PublicKeyCredential === 'undefined') {
    return false;
  }
  //return Promise<bool>
  return PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
};

export const register = async (user = {}) => {
  const {id: userId, name, displayName} = user;

  try {
    const registrationOptionsResponse = await fetch(`${apiUrl}/registration-options?${new URLSearchParams({userId})}`, {
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });
    const credentialCreationOptions = await registrationOptionsResponse.json();

    if (credentialCreationOptions.success !== true) {
      return credentialCreationOptions;
    }

    credentialCreationOptions.challenge = new Uint8Array(credentialCreationOptions.challenge.data);
    credentialCreationOptions.user.id = new Uint8Array(credentialCreationOptions.user.id.data);
    credentialCreationOptions.user.name = name;
    credentialCreationOptions.user.displayName = displayName;

    // без установки опций ниже регистрация на андройд сводится к подтверждению по биометрии,
    // вместо создания ключа доступа
    credentialCreationOptions.authenticatorSelection= {
      "residentKey": "preferred",
      "requireResidentKey": false,
      "userVerification": "preferred"
    };
    credentialCreationOptions.hints = [];
    credentialCreationOptions.extensions = {"credProps": true}

    const credential = await navigator.credentials.create({
      publicKey: credentialCreationOptions
    });

    const credentialId = bufferToBase64(credential.rawId);
    const data = {
      rawId: credentialId,
      response: {
        attestationObject: bufferToBase64(credential.response.attestationObject),
        clientDataJSON: bufferToBase64(credential.response.clientDataJSON),
        id: credential.id,
        type: credential.type
      }
    };

    return await (await fetch(`${apiUrl}/register`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({credential: data}),
      credentials: 'include'
    })).json();
  } catch (e) {
    if (e instanceof DOMException && e.name === 'NotAllowedError') {
      return {success: false, message: 'Операция не доступна или была отменена'};
    }
    console.log(e);
    return {success: false, message: 'Произошла непредвиденная ошибка. Пожалуйста, повторите свое последнее действие'};
  }
};

export const authenticate = async (settings = {}) => {
  const {
    mediation = "optional",
    abortSignal = undefined,
  } = settings;

  try {
    const credentialRequestOptions = await (await fetch(`${apiUrl}/authentication-options`, {
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    })).json();

    credentialRequestOptions.challenge = new Uint8Array(credentialRequestOptions.challenge.data);
    credentialRequestOptions.allowCredentials = [];

    const credential = await navigator.credentials.get({
      signal: abortSignal,
      publicKey: credentialRequestOptions,
      mediation
    });

    const data = {
      rawId: bufferToBase64(credential.rawId),
      response: {
        authenticatorData: bufferToBase64(credential.response.authenticatorData),
        signature: bufferToBase64(credential.response.signature),
        userHandle: bufferToBase64(credential.response.userHandle),
        clientDataJSON: bufferToBase64(credential.response.clientDataJSON),
        id: credential.id,
        type: credential.type
      }
    };

    const response = await auth({
      credential: data
    });

    if (!response.success) {
      return response
    } else {
      response.authenticatorAttachment = credential.authenticatorAttachment;
      return response;
    }
  } catch (e) {
    console.log(e);
    if (e instanceof DOMException && e.name === 'NotAllowedError') {
      return {success: false, message: 'Операция не доступна или была отменена'};
    }
    return {success: false, message: 'Произошла непредвиденная ошибка. Пожалуйста, повторите свое последнее действие', errorData: e.message};
  }
};