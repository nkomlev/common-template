import Link from "next/link";
import MainTemplate from "@/components/templates/MainTemplate";
import { ExternalLinkIcon } from "lucide-react";
import { getDictionary } from "@/app/dictionaries";

const MainPage = async () => {
  if (!global.dictionary) {
    // рендер page.jsx происходит то рендера layout.js почему-то
    // поэтому во избежания ошибки со словарем временно делаем так
    const language = process.env.INTERFACE_LANGUAGE || 'ru';
    const dictionary = await getDictionary(language);
    global.dictionary = dictionary;
  }

  return (
    <MainTemplate>
        <div className="p-10 h-full w-full flex items-center justify-center gap-16 flex-col ">
          <h1 className="text-3xl font-bold">
            {global.dictionary && dictionary.LEX_1}
            {/* Добро пожаловать в тестовый сервис-шаблон */}
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
    </MainTemplate>
  );
};

export default MainPage