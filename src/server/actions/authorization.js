'use server';

import {SignJWT} from "jose";
import prisma from "../../../prisma";
import {cookies} from "next/headers";
import sha256 from "crypto-js/sha256";


async function authorizeByCredential(credential, challenge) {
  const res = await (await fetch(`${process.env.ORIGIN_URL}/api/webauthn/authenticate`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `challenge=${challenge};`
    },
    body: JSON.stringify({
      credential: credential
    }),
  })).json();

  const { customerId } = res;

  return await prisma.customer.findUnique({
    where: {
      id: Number(customerId)
    }
  });
}

async function authorizeByPassword(login, password) {
  if (!login || !password) {
    throw { success: false, message: 'Логин и пароль должны быть указаны', status: 400 };
  }

  const user = await prisma.customer.findUnique({
    where: {
      login: login
    },
    select: {
      id: true,
      login: true,
      hashedPassword: true
    }
  });

  if (user) {
    if (!user.hashedPassword) {
      throw {
        success: false,
        message: 'Пожалуйста, свяжитесь с администратором конференции, чтобы сбросить пароль',
        status: 500
      };
    }

    // хэшированный пароль имеет префикс hash.v1#
    if (`hashed-${sha256(user.id + '/' + password)}` === user.hashedPassword) {
      return user;
    }
  }

  throw { success: false, message: 'Неправильный логин или пароль', status: 400 };
}

export const authorization = async ({ login, password, credential }) => {
  try {
    let user;
    const cookiesStore = await cookies();

    if (credential) {
      user = await authorizeByCredential(credential, cookiesStore.get('challenge').value)
    } else {
      user = await authorizeByPassword(login,password)
    }

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

    const isAddedPasskey = await prisma.passkey.findFirst({ where: { customerId: user.id }}) !== null;

    // Отправляем дополнительно id чтобы удобно загружать данные пользователя на клиенте
    const response = { success: true, token: token, id: user.id, webAuthOnDevice: isAddedPasskey }

    cookiesStore.set({
      name: "token",
      value: token,
      path: "/",
    });
    cookiesStore.set({
      name: "customerId",
      value: user.id,
      path: "/",
    });

    return response;
  } catch (e) {
    console.log(e);
    if (e.success === false){
      return { success: false, message: e.message }
    }
    return{ success: false, message: e.message };
  }
}