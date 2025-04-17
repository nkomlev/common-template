'use server';
import prisma from "../../../../../prisma.js";
import sha256 from "crypto-js/sha256";

export const createAdminAction = async ({ login, firstName, lastName, password }) =>  {
  try {
    // Проверяем что в базе нет пользователей, имеющих роль администратора, иначе данный запрос будет заблокирован
    const adminUser = await prisma.customer.findFirst({
      where: {
        role: {
          has: "ADMIN"
        }
      }
    });

    if (adminUser) {
      return {
        success: false,
        error: 'ERROR_ADMIN_ALREADY_EXISTS',
        message: 'Администратор уже существует'
      };
    }

    const admin = await prisma.customer.create({
      data: {
        login,
        firstName,
        lastName,
        role: ["ADMIN"]
      }
    }); // создаем пользователя

    // Устанавливаем пароль в хэшированном виде
    await prisma.customer.update({
      where: {
        id: admin.id
      },
      data: {
        hashedPassword: `hashed-${sha256(admin.id + '/' + password)}`
      }
    })

    return { success: true, data: admin };
  } catch (e) {
    console.log(e);
    // В случае если обычный пользователь с таким логином уже существует в базе, то будет появляться ошибка prisma P2002
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          success: false,
          error: 'ERROR_SAME_UNIQUE_FIELD',
          message: 'Нельзя использовать данный логин'
        }
      }
    }
    // Обрабатываем все остальные неизвестные ошибки
    return {
      success: false,
      error: 'UNEXPECTED_ERROR',
      message: `Произошла непредвиденная ошибка: ${e.message}`
    }
  }
}