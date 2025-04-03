'use server';
import prisma from "../../../../prisma";

export const getCurrentCustomerData = async (customerId) =>  {
  try {
    const customerData = await prisma.customer.findFirst({
      where: {
        id: customerId
      },
      select: {
        firstName: true,
        id: true,
        profileImage: true,
        lastName: true,
        login: true,
        role: true,
        notificationGroup: true
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