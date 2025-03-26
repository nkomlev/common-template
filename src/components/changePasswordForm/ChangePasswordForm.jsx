'use client';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InputWithTitle } from "@/components/ui/input";
import { useMessage} from "@/components/ui/hooks/use-toast-message";
import { changePassword } from "@/server/actions/changePassword";

const ChangePasswordForm = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { showError, showApprove } = useMessage();

  useEffect(() => {
    setNewPassword('');
    setPrevPassword('');
    setConfirmNewPassword('');
  }, [isEdit])

  const handleChangePassword = async () => {
    if (!prevPassword || !newPassword || !confirmNewPassword) {
      showError({ title: "Заполните все поля!" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showError({ title: "Пароли не совпадают" });
      return;
    }
    if (prevPassword === newPassword) {
      showError({ title: "Пароли не должны совпадать" });
      return;
    }

    const changePassRes = await changePassword({ currentPassword: prevPassword, newPassword });
    if (changePassRes.success) {
      showApprove({
        title: 'Пароль успешно изменен'
      });
      setIsEdit(false);
      return;
    }
    showError({ title: changePassRes.message })
  }

  if (isEdit) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-center">Смена пароля</div>
        <InputWithTitle
          title="Старый пароль"
          type="password"
          value={prevPassword}
          onChange={(e) => setPrevPassword(e.target.value)}
        />
        <InputWithTitle
          title="Новый пароль"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <InputWithTitle
          title="Повторите пароль"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <Button
          onClick={handleChangePassword}
        >
          Изменить
        </Button>
        <Button
          onClick={() => setIsEdit(false)}
        >
          Отмена
        </Button>
      </div>
    );
  }
  return (
    <Button
      onClick={() => setIsEdit(true)}
    >
      Сменить пароль
    </Button>
  );
};

export default ChangePasswordForm;