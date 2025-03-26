import {useState, useEffect} from "react";
import {register, isWebAuthnSupportedOnDevice} from "@/lib/webauthn/requests";
import { useMessage } from "@/components/ui/hooks/use-toast-message";

export function useWebAuthn() {
    const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(false);
    const { showError, showApprove } = useMessage();

    useEffect(() => {
        const checkIsWebAuthnSupported = async () => {
            const res = await isWebAuthnSupportedOnDevice();
            setIsWebAuthnSupported(res);
        }
        checkIsWebAuthnSupported();
    }, []);

    const handleRegister = async (currentCustomer) => {
        const resData = await register({
            id: currentCustomer.id,
            name : currentCustomer.login,
            displayName : currentCustomer.login
        });

        if (resData.success === true) {
            showApprove({
                title: <div>
                    Ключ доступа создан.
                </div>
            })
            return true;
        } else {
            showError({ title: 'Произошла непредвиденная ошибка. Пожалуйста, повторите свое последнее действие.' });
            return false;
        }
    }

    return {
        isWebAuthnSupported,
        register: handleRegister
    }
}