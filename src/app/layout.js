import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "@/components/ui/toaster";
import DictionaryProvider from "@/components/dictionaryProvider/DictionaryProvider";
import { getDictionary } from "@/app/dictionaries";
import StoreManager from "@/components/storeManager/StoreManager";
export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Default app template",
};

export default async function RootLayout({ children }) {
  const language = process.env.INTERFACE_LANGUAGE || 'ru';
  const dictionary = await getDictionary(language);

  // Устанавливаем словарь лексем в global для удобного использования внутри всех серверных компонент приложения
  global.dictionary = dictionary;

  return (
    <html lang={language} className="dark" suppressHydrationWarning>
      <body>
      <DictionaryProvider dictionary={dictionary}>
        <CookiesProvider>
          {children}
          <Toaster />
          <StoreManager />
        </CookiesProvider>
      </DictionaryProvider>
      </body>
    </html>
  );
}
