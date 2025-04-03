'use client';
import { useStore } from "@/store/useStore";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle
} from "@common-templates/shared/components/ui/alert-dialog";
import { useWebAuthn } from "@/lib/hooks/useWebAuthn";

const WebAuthnRegistrationDialog = () => {
  const { showWebAuthnRegistrationMessage, currentCustomer } = useStore();
  const { isWebAuthnSupported, register } = useWebAuthn();

  const handleRegistration = async () => {
    if (currentCustomer.id) {
      await register(currentCustomer);

      useStore.setState({ showWebAuthnRegistrationMessage: false });
    }
  }
  const handleCancel = () => {
    useStore.setState({ showWebAuthnRegistrationMessage: false });
  }

  if (!isWebAuthnSupported || !currentCustomer?.id) {
    return null;
  }

  return (
    <AlertDialog open={showWebAuthnRegistrationMessage}>
      <AlertDialogContent>
        <AlertDialogTitle>
          <AlertDialogHeader className="text-left font-bold">
            Ключ доступа
          </AlertDialogHeader>
        </AlertDialogTitle>
        <AlertDialogDescription>
          Ключи обеспечивают лучшую защиту, чем пароли: все, что вам нужно - это ваш телефон. Хотите создать?
        </AlertDialogDescription>
        <AlertDialogFooter className="flex flex-row flex-wrap items-center justify-end gap-4">
          <AlertDialogCancel
            className="m-0"
            onClick={handleCancel}
          >
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRegistration}
          >
            Создать
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WebAuthnRegistrationDialog;