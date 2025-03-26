import prisma from "../../../prisma";
import { redirect } from "next/navigation";
import LoginForm from "@/app/authorization/LoginForm";
import MainTemplate from "@/components/templates/MainTemplate";

const Authorization = async () => {
  // При первом запуске проекта с пустой базой сначала необходимо создать пользователя с ролью Администратор, для этого автоматически отправляем на страницу /adminRegistration
  const isCustomersAvailable = await prisma.customer.findFirst({
    where: {
      role: {
        has: "ADMIN"
      }
    },
    select: { id: true }
  });

  if (!isCustomersAvailable) {
    redirect('/adminRegistration');
  }

  return (
    <MainTemplate>
      <div className="w-full h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </MainTemplate>
  );
};

export default Authorization;