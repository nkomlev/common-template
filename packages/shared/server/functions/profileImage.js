'use server';
import prisma from "../../../../prisma";
import { middlewareVerifyTokenWithoutRequest } from "../../lib/verifyToken";

export const setProfileImage = async ({ customerId, profileImage }) =>  {
  try {
    // const isAuth = await middlewareVerifyTokenWithoutRequest();
    //
    // if (!isAuth.success) {
    //   return {
    //     success: false,
    //     error: 'UNAUTHORIZED',
    //     message: `Пользователь не авторизован`
    //   };
    // }

    const customerData = await prisma.customer.update({
      where: {
        id: customerId
      },
      data: {
        profileImage: profileImage,
      }
    });

    return { success: true, data: customerData };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: 'UNEXPECTED_ERROR',
      message: `Произошла непредвиденная ошибка: ${e.message}`
    }
  }
}