'use client';
import { useEffect, useState } from "react";
import {Button} from "../ui/button";
import {InputWithTitle} from "../ui/input";
import {useMessage} from "../ui/hooks/use-toast-message";

const ChangePasswordForm = ({ defaultIsEdit, handleChangePassword }) => {
  const [isEdit, setIsEdit] = useState(defaultIsEdit);
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { showError, showApprove } = useMessage();

  useEffect(() => {
    // Чтобы можно было менять состояние извне
    setIsEdit(defaultIsEdit);
  }, [defaultIsEdit])

  useEffect(() => {
    setNewPassword('');
    setPrevPassword('');
    setConfirmNewPassword('');
  }, [isEdit]);

  const innerHandleChangePassword = () => {
    const changePasswordBody = {
      newPassword,
      prevPassword,
      confirmNewPassword
    }
    if (typeof handleChangePassword === 'function') {
      handleChangePassword(changePasswordBody)
        .then(data => {
          setIsEdit(false);
          showApprove({ title: data.message });
        })
        .catch(e => {
          showError({ title: e.message });
        });
    } else {
      console.error('handleChangePassword prop is expected to be a functions');
    }
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
          onClick={innerHandleChangePassword}
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
}

export default ChangePasswordForm;