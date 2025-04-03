import Link from "next/link";
import MainTemplate from "@/components/template/MainTemplate";
import { ExternalLinkIcon } from "lucide-react";
import WebAuthnRegistrationDialog from "@/components/webAuthRegistrationDialog/WebAuthRegistrationDialog";

const MainPage = async () => {
  return (
    <MainTemplate>
      <div className="p-10 h-full w-full flex items-center justify-center gap-16 flex-col ">
        <h1 className="text-3xl font-bold">
          Добро пожаловать в тестовый сервис-шаблон
        </h1>

        <div className="text-xl">
          Здесь вы можете найти:
          <ul className="ml-2 mt-2">
            <li className="hover:underline cursor-pointer">
              <Link href="/authorization" className="flex gap-2">
                <ExternalLinkIcon />
                Шаблон авторизации
              </Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link href="/auth/admin" className="flex gap-2">
                <ExternalLinkIcon className="min-w-6" />
                Админку, выполненую с помощью next-admin
              </Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link href="/adminRegistration" className="flex gap-2">
                <ExternalLinkIcon className="min-w-6" />
                Регистрацию администратора, при развертывании пустого проекта
              </Link>
            </li>
            <li className="hover:underline cursor-pointer">
              <Link href="/pwa" className="flex gap-2">
                <ExternalLinkIcon className="min-w-6" />
                Работу с PWA
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <WebAuthnRegistrationDialog />
    </MainTemplate>
  );
};

export default MainPage