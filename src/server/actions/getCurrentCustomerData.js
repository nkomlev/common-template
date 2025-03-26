'use server';

import {cookies} from "next/headers";
import prisma from "../../../prisma";


export const getCurrentCustomerData = async (customerId) =>  {
  const cookiesStore = await cookies();

  try {
    const customerData = await prisma.customer.findFirst({
      where: {
        id: customerId || Number(cookiesStore.get('customerId').value)
      },
      select: {
        firstName: true,
        id: true,
        profileImage: true,
        lastName: true,
        login: true,
        role: true,
        group: true
      }
    });

    if (customerData) {
      return { success: true, data: customerData };
    }

    return { success: false, data: null };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: 'UNEXPECTED_ERROR',
      message: `Произошла непредвиденная ошибка: ${e.message}`
    }
  }
}