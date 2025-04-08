import sha256 from "crypto-js/sha256";
import prisma from "../../../../../../prisma";

// Чтобы поддержать возможность задавать пароль в явном виде, но не хранить его так используется функция,
// которая преобраует пароль из явного вида в хэш при создании/изменении пользователя
export const hashCustomerPassword = async (customer) => {
  try {
    let hashedPassword = customer.data.hashedPassword;
    if (!hashedPassword.includes('hashed-')) {
      hashedPassword = `hashed-${sha256(customer.data.id + '/' + hashedPassword)}`;
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