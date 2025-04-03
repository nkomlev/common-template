import { nextAdminUploadImage } from "@/lib/nextAdminOptions/functions/uploadImage";
import { hashCustomerPassword } from "@/lib/nextAdminOptions/functions/hashPassword";

export const CustomerModel = {
  toString: (customer) => customer.login,
  title: 'Customers',
  icon: 'UserIcon',
  edit: {
    fields: {
      profileImage: {
        format: "file",
        handler: {
          upload: nextAdminUploadImage
        },
      },
    },
    hooks: {
      afterDb: hashCustomerPassword
    }
  }
}