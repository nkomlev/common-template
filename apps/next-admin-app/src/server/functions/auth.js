'use server';
import {authorization} from "@common-templates/shared/server/functions/authorization";
import prisma from "@common/prisma";
import {cookies} from "next/headers";
import { createHash } from 'crypto';

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
    if (`hashed-${createHash('sha256').update(user.id + '/' + password).digest('hex')}` === user.hashedPassword) {
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