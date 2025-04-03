'use server';

import prisma from "../../../../prisma";
import sha256 from "crypto-js/sha256";
import {middlewareVerifyTokenWithoutRequest} from "../../lib/verifyToken";

export const changePassword = async ({ currentPassword, newPassword, token }) => {
  try {
    const isAuth = await middlewareVerifyTokenWithoutRequest(token);

    if (!isAuth.success) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: `Пользователь не авторизован`
      };
    }

    const customerData = await prisma.customer.findFirst({
      where: {
        id: isAuth.data.id
      }
    });

    if (customerData && `hashed-${sha256(customerData.id + '/' + currentPassword)}` === customerData.hashedPassword) {
      const newHashedPass = `hashed-${sha256(customerData.id + '/' + newPassword)}`;

      await prisma.customer.update({
        where: {
          id: customerData.id
        },
        data: {
          hashedPassword: newHashedPass
        }
      });
      console.log('Updated password for customer: ', customerData.id);
      return {
        success: true,
      }
    }

    return {
      success: false,
      error: 'WRONG_PASSWORD',
      message: `Некорректный пароль`
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: 'UNEXPECTED_ERROR',
      message: `Произошла непредвиденная ошибка: ${e.message}`
    }
  }
}