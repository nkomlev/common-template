import {getCurrentCustomerData} from "@/server/actions/getCurrentCustomerData";

export const getNextAdminUserData = async () => {
  const { success, data } = await getCurrentCustomerData();

  if (success) {
    return {
      data: {
        name: `${data.firstName} ${data.lastName}`,
        picture: data.profileImage
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