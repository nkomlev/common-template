'use client';
import { useState } from "react";
import { InputWithTitle } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessage } from "@/components/ui/hooks/use-toast-message";
import { useWebAuthn } from "@/lib/hooks/useWebAuthn";
import { useDictionary } from "@/components/dictionaryProvider/DictionaryProvider";
import { authenticate } from "@/lib/webauthn/requests";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { authorization } from "@/server/actions/authorization";
import {getCurrentCustomerData} from "@/server/actions/getCurrentCustomerData";

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { showError } = useMessage();
  const { isWebAuthnSupported } = useWebAuthn();
  const dictionary = useDictionary();
  const router = useRouter();
  const { setCurrentCustomer } = useStore()

  const handleLoginByPassword = async () => {
    if (!login || !password) {
      showError({ title: dictionary.LEX_8 }); // Заполните все поля
      return;
    }

    const authRes = await authorization({ login, password });

    if (authRes.success) {
      useStore.setState({ showWebAuthnRegistrationMessage: authRes.webAuthOnDevice !== true });
      if (authRes.id) {
        const currentUserRes = await getCurrentCustomerData(authRes.id);
        if (currentUserRes.success && currentUserRes.data) {
          setCurrentCustomer(currentUserRes.data)
        }
      }
      router.replace('/auth/admin');
      return;
    }

    showError({ title: authRes.message });
  }

  const handleLoginByCredentials = async () => {
    try {
      const result = await authenticate();

      if (result.success && !result.error) {
        router.replace('/auth/admin');
        return;
      }
      showError({ title: result.message });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-80 h-fit p-6 bg-secondary/50 rounded-xl flex flex-col gap-6">
      <h1 className="title-xl">
        {dictionary.LEX_2}
        {/* Авторизация */}
      </h1>
      <div className="flex flex-col gap-4">
        <InputWithTitle
          title={dictionary.LEX_3} // Логин
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <InputWithTitle
          title={dictionary.LEX_4} // Пароль
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Button
          onClick={handleLoginByPassword}
        >
          {dictionary.LEX_5}
          {/* Войти */}
        </Button>
        {isWebAuthnSupported && <>
          <div
            className={'p-2 text-center font-bold text-[1rem]/[1.75rem]'}>
            {dictionary.LEX_6} {/* или */}
          </div>
          <Button
            onClick={handleLoginByCredentials}
          >
            {dictionary.LEX_7}
            {/* Войти по ключу доступа */}
          </Button>
        </>
        }
      </div>
    </div>
  );
};

export default LoginForm