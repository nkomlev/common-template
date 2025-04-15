'use client';

import LoginForm from "@common-templates/shared/components/LoginForm/LoginForm";
import {auth} from "@/server/functions/auth";
import {useRouter} from "next/navigation";
import {useStore} from "@/store/useStore";
import {getCurrentCustomerData} from "@common-templates/shared/server/functions/getCurrentCustomerData";
import {authenticate} from "@/lib/webauthn/requests";

const LoginPage = () => {
  const router = useRouter();
  const { setCurrentCustomer } = useStore();

  const handleLogin = ({ login, password }) => new Promise(async (resolve, reject) => {
    if (!login || !password) {
      reject({ success: false, message: "Заполните все поля" });
      return;
    }

    const authRes = await auth({ login, password });

    if (authRes.success) {
      useStore.setState({ showWebAuthnRegistrationMessage: authRes.webAuthOnDevice !== true });
      if (authRes.id) {
        const currentUserRes = await getCurrentCustomerData(authRes.id);
        if (currentUserRes.success && currentUserRes.data) {
          setCurrentCustomer(currentUserRes.data)
        }
      }
      resolve({ success: true });
      router.replace('/');
      return;
    }
    reject({ success: false, message: authRes.message })
  });

  const handleLoginByCredentials = async () => new Promise( async(resolve, reject) => {
    try {
      const result = await authenticate();

      if (result.success && !result.error) {
        resolve({ success: true })
        router.replace('/');
        return;
      }
      reject({ success: false, message: result.message })
    } catch (e) {
      console.log(e);
      reject({ success: false, message: `Unexpected error: ${e.message}` });
    }
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoginForm
        isWebAuthnSupported={true}
        handleLoginByPassword={handleLogin}
        handleLoginByCredentials={handleLoginByCredentials}
      />
    </div>
  )
}

export default LoginPage;