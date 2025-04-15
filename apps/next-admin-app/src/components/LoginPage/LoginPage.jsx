'use client';

import LoginForm from "@common-templates/shared/components/LoginForm/LoginForm";
import {auth} from "@/server/functions/auth";
import {useRouter} from "next/navigation";
import {useStore} from "@/store/useStore";
import {getCurrentCustomerData} from "@common-templates/shared/server/functions/getCurrentCustomerData";

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
      // useStore.setState({ showWebAuthnRegistrationMessage: authRes.webAuthOnDevice !== true });
      if (authRes.id) {
        const currentUserRes = await getCurrentCustomerData(authRes.id);
        if (currentUserRes.success && currentUserRes.data) {
          setCurrentCustomer(currentUserRes.data)
        }
      }
      resolve({ success: true });
      router.replace('/auth/admin');
      return;
    }
    reject({ success: false, message: authRes.message })
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoginForm isWebAuthnSupported={false} handleLoginByPassword={handleLogin} />
    </div>
  )
}

export default LoginPage;