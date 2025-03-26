import { cookies } from "next/headers";
import { InputWithTitle } from "@/components/ui/input";
import { getCurrentCustomerData } from "@/server/actions/getCurrentCustomerData";
import { redirect } from "next/navigation";
import AvatarSettings from "@/components/avatarSettings/AvatarSettings";
import ChangePasswordForm from "@/components/changePasswordForm/ChangePasswordForm";

const Profile = async () => {
  const cookiesStore = await cookies();
  const currentCustomerRes = cookiesStore.get('customerId') && await getCurrentCustomerData(Number(cookiesStore.get('customerId').value))
  const { success, data } = currentCustomerRes;

  // Если пользователь не найден или произошла какая-то ошибка
  if (!success) {
    redirect('/');
  }

  return (
    <>
      <AvatarSettings
        defaultImage={data.profileImage}
      />
      <InputWithTitle
        className="select-none"
        title="Имя"
        value={data.firstName}
        readOnly
      />
      <InputWithTitle
        className="touch-none"
        title="Фамилия"
        value={data.lastName}
        readOnly
      />
      <InputWithTitle
        className="select-none"
        title="Роли"
        value={data.role}
        readOnly
      />
      <InputWithTitle
        className="select-none"
        title="Группы"
        value={data.group?.map(el => el.name)?.join(', ')}
        readOnly
      />
      <ChangePasswordForm />
    </>
  );
};

export default Profile;
