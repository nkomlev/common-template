import {redirect} from "next/navigation";
import prisma from "../../../../prisma.js";
import LoginPage from "@/components/LoginPage/LoginPage";

export default async function Authorization() {
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
    <LoginPage />
  );
}
