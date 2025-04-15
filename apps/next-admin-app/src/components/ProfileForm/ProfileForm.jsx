'use client';
import Profile from "@common-templates/shared/components/Profile/Profile";
import { useRouter } from "next/navigation";
import { changePassword } from "@common-templates/shared/server/functions/changePassword";
import { useCookies } from "next-client-cookies";
import { useStore } from "@/store/useStore";
import { getCurrentCustomerData } from "@common-templates/shared/server/functions/getCurrentCustomerData";

const ProfileForm = () => {
  const cookies = useCookies();
  const router = useRouter();
  const customerId = Number(cookies.get('customerId'));
  const { setCurrentCustomer } = useStore();

  const handleCustomerUndefined = () => {
    router.replace('/');
  }

  const handleChangePassword = ({ prevPassword, newPassword, confirmNewPassword }) => new Promise(async (resolve, reject) => {
    if (!prevPassword || !newPassword || !confirmNewPassword) {
      reject({ success: false, message: "Заполните все поля!" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      reject({ success: false, message: "Пароли не совпадают"  });
      return;
    }
    if (prevPassword === newPassword) {
      reject({ success: false, message: "Пароли не должны совпадать"  });
      return;
    }

    const token = cookies.get('token');
    const changePassRes = await changePassword({ currentPassword: prevPassword, newPassword, token });

    if (changePassRes.success) {
      resolve({ success: true, message: 'Пароль успешно изменен' })
      return;
    }
    reject({ success: false, message: changePassRes.message  });
  })

  const handleChangeAvatar = async () => {
    try {
      if (customerId) {
        const currentUserRes = await getCurrentCustomerData(customerId);
        if (currentUserRes.success && currentUserRes.data) {
          setCurrentCustomer(currentUserRes.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Profile
      customerId={customerId}
      handleChangePassword={handleChangePassword}
      handleCustomerUndefined={handleCustomerUndefined}
      onChangeImage={handleChangeAvatar}
    />
  )
};

export default ProfileForm;