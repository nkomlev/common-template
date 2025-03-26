'use client';
import { useStore } from "@/store/useStore";
import { useDictionary } from "@/components/dictionaryProvider/DictionaryProvider";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useWebAuthn } from "@/lib/hooks/useWebAuthn";

const WebAuthnRegistrationDialog = () => {
  const dictionary = useDictionary();
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

  if (!isWebAuthnSupported) {
    return null;
  }

  return (
    <AlertDialog open={showWebAuthnRegistrationMessage}>
      <AlertDialogContent>
        <AlertDialogTitle>
          <AlertDialogHeader className="text-left font-bold">
            {dictionary.LEX_28}{/* Ключ доступа */}
          </AlertDialogHeader>
        </AlertDialogTitle>
        <AlertDialogDescription>
          {dictionary.LEX_29}
          {/* Ключи обеспечивают лучшую защиту, чем пароли: все, что вам нужно - это ваш телефон. Хотите создать? */}
        </AlertDialogDescription>
        <AlertDialogFooter className="flex flex-row flex-wrap items-center justify-end gap-4">
          <AlertDialogCancel
            className="m-0"
            onClick={handleCancel}
          >
            {dictionary.LEX_30} {/* Отмена */}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRegistration}
          >
            {dictionary.LEX_31} {/* Создать */}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WebAuthnRegistrationDialog;