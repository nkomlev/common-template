import { jwtVerify } from "jose";

export const verifyJwtToken = async (token, secret) => {
  try {
    // В качестве ключа используется Uint8Array
    const { payload } = await jwtVerify(token, new TextEncoder().encode(
      secret || process.env.JWT_SECRET
    ));

    return payload;
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const middlewareVerifyTokenWithoutRequest = async (token, secret) => {
  const currentClient = token && (await verifyJwtToken(token.value));
  if (!currentClient) {
    return { success: false, message: 'Некорректный токен' };
  }
  return { success: true, data: currentClient };
}