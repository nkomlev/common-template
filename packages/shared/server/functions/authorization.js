'use server';

import {SignJWT} from "jose";

export const authorization = async ({ authData, authFunc }) => {
  try {
    let user = await authFunc(authData);

    if (user && user.id) {
      const token = await new SignJWT({
        id: user.id,
        email: user.email,
        role: user.role
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME || '1d')
        // sign для алгоритма HS256 принимает только Uint8Array, KeyObject, CryptoKey
        .sign(new TextEncoder().encode(
          process.env.JWT_SECRET
        ));

      // Отправляем дополнительно id чтобы удобно загружать данные пользователя на клиенте
      const response = { success: true, token: token, id: user.id }
      return response;
    }
    return { success: false, message: 'User is undefined' }
  } catch (e) {
    console.log(e);
    if (e.success === false){
      return { success: false, message: e.message }
    }
    return{ success: false, message: e.message };
  }
}