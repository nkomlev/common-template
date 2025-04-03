import prisma from "../../../prisma";
import { redirect } from "next/navigation";
import RegistrationForm from "@/app/adminRegistration/RegistrationForm";
import MainTemplate from "@/components/templates/MainTemplate";

const AdminRegistration = async () => {
  // Если для сервиса создан хотя бы один администратор, то вся остальная настройка, в том числе создание новых пользователей с ролью Администратор
  // происходит через админ-панель next-admin. Поэтому данная страница становится недоступна и все пользователи перенаправляются на /authorization
  const isCustomersAvailable = await prisma.customer.findFirst({
    where: {
      role: {
        has: "ADMIN"
      }
    },
    select: { id: true }
  });

  if (isCustomersAvailable) {
    redirect('/authorization');
  }

  return (
    <MainTemplate>
      <div className="w-full h-full flex items-center justify-center">
        <RegistrationForm />
      </div>
    </MainTemplate>
  );
};

export default AdminRegistration;