import prisma from "../../../../prisma.js";
import { cookies } from "next/headers";

export const getNextAdminUserData = async () => {
  const cookiesStore = await cookies();
  let customerData;
  if (cookiesStore.get('customerId')) {
    customerData = await prisma.customer.findFirst({
      where: {
        id: Number(cookiesStore.get('customerId').value)
      },
      select: {
        firstName: true,
        id: true,
        profileImage: true,
        lastName: true,
      }
    });
  }

  if (customerData) {
    return {
      data: {
        name: `${customerData.firstName} ${customerData.lastName}`,
        picture: customerData.profileImage
      },
      logout: '/logout',
    }
  }

  return {
    data: {
      name: `Undefined user`,
    },
    logout: '/logout',
  };
}