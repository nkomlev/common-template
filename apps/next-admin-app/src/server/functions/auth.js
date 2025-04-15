'use server';
import {authorization} from "@common-templates/shared/server/functions/authorization";
import prisma from "../../../../../prisma";
import {cookies} from "next/headers";
import sha256 from "crypto-js/sha256";

const authByPassword = async ({ login, password }) => {
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

export const auth = async ({ login, password }) => {
  const cookiesStore = await cookies();

  const res = await authorization({ authData: { login, password }, authFunc: authByPassword });

  if (res.success) {
    const { token, id } = res;
    cookiesStore.set({
      name: "token",
      value: token,
      path: "/",
    });
    cookiesStore.set({
      name: "customerId",
      value: id,
      path: "/",
    });
  }

  return res;
}