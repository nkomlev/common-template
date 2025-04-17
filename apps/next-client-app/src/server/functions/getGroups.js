'use server';

import prisma from "@common/prisma";

export const getGroups = async () =>  {
  try {
    const groupsData = await prisma.notificationGroup.findMany();

    return { success: true, data: groupsData };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: 'UNEXPECTED_ERROR',
      message: `Произошла непредвиденная ошибка: ${e.message}`
    }
  }
}