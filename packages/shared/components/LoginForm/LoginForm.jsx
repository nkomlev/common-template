'use client';
import { useState } from 'react';
import { InputWithTitle } from "../ui/input";
import { Button } from "../ui/button";
import {useMessage} from "../ui/hooks/use-toast-message";

const LoginForm = ({ handleLoginByPassword, isWebAuthnSupported = false, handleLoginByCredentials }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { showError } = useMessage();

  const innerLoginByPasswordHandler = async () => {
    if (typeof handleLoginByPassword === 'function') {
      const authBody = {
        login,
        password
      };
      handleLoginByPassword(authBody).catch(err => {
        showError({ title: err.message });
      })
    } else {
      console.error('handleLoginByPassword props is expected to be a function');
    }
  }


  return (
    <>
      <div className="w-80 h-fit p-6 bg-card rounded-xl flex flex-col gap-6">
        <h1 className="title-xl">
          Авторизация
        </h1>
        <div className="flex flex-col gap-4">
          <InputWithTitle
            title="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <InputWithTitle
            title="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Button
            onClick={innerLoginByPasswordHandler}
          >
            Войти
          </Button>
          {isWebAuthnSupported && <>
            <div
              className={'p-2 text-center font-bold text-[1rem]/[1.75rem]'}>
              или
            </div>
            <Button
              onClick={handleLoginByCredentials}
            >
              Войти по ключу доступа
            </Button>
          </>
          }
        </div>
      </div>
    </>
  )
}

export default LoginForm;