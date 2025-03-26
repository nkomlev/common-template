'use server';

import {cookies} from "next/headers";
import prisma from "../../../prisma";
import sha256 from "crypto-js/sha256";
import {middlewareVerifyTokenWithoutRequest} from "@/lib/middlewareHandlers";

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const isAuth = await middlewareVerifyTokenWithoutRequest();

    if (!isAuth.success) {
      return {
        success: false,
        error: 'UNAUTHORIZED',
        message: `Пользователь не авторизован`
      };
    }

    const cookiesStore = await cookies();

    const customerData = await prisma.customer.findFirst({
      where: {
        id: Number(cookiesStore.get('customerId').value)
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