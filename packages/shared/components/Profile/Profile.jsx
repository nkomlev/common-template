'use client';
import { getCurrentCustomerData } from "../../server/functions";
import { InputWithTitle } from "../ui/input";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import AvatarSettings from "../AvatarSettings/AvatarSettings";
import { useEffect, useState } from "react";

const Profile = ({ customerId, handleCustomerUndefined, handleChangePassword, onChangeImage }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const currentCustomerRes = await getCurrentCustomerData(customerId);
      const { success, data } = currentCustomerRes;

      if (!success && typeof handleCustomerUndefined === 'function') {
        handleCustomerUndefined();
      } else {
        setData(data);
      }
    }
    loadData();
  }, [customerId]);

  if (!data) {
    return null;
  }

  return (
    <>
      <AvatarSettings
        defaultImage={data.profileImage}
        customerId={customerId}
        onChangeImage={onChangeImage}
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
        value={data.notificationGroup?.map(el => el.name)?.join(', ')}
        readOnly
      />
      <ChangePasswordForm handleChangePassword={handleChangePassword} />
    </>
  );
}

export default Profile;