import { redirect } from "next/navigation";
import {getCurrentCustomerData} from "@/server/actions/getCurrentCustomerData";

// Компонент-обертка для создания страницы, доспуной только пользователям с определенными ролями
const RolePage = async ({ children, rolesWithAccess = ['USER', 'ADMIN', 'SUPPORT'] }) => {
  const currentCustomer = (await getCurrentCustomerData())?.data;

  // Если у пользователя нет необходимой роли, то отправляем его на главную
  if (!currentCustomer || !currentCustomer.role || !currentCustomer.role.some(role => rolesWithAccess.includes(role))) {
    redirect('/');
  }

  return (
    <>{children}</>
  );
}

export default RolePage;