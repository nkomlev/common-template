import { createHash } from 'crypto';
import prisma from "@common/prisma";

// Чтобы поддержать возможность задавать пароль в явном виде, но не хранить его так используется функция,
// которая преобраует пароль из явного вида в хэш при создании/изменении пользователя
export const hashCustomerPassword = async (customer) => {
  try {
    let hashedPassword = customer.data.hashedPassword;
    if (!hashedPassword.includes('hashed-')) {
      hashedPassword = `hashed-${createHash('sha256').update(customer.data.id + '/' + hashedPassword).digest('hex')}`;
      await prisma.customer.update({
        where: {
          id: customer.data.id
        },
        data: {
          hashedPassword: hashedPassword
        }
      });
    }
  } catch (e) {
    console.log('hashCustomerPassword error: ', e);
  }
}