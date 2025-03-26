import {getCurrentCustomerData} from "@/server/actions/getCurrentCustomerData";

// Компонент-обретка для создания компонент, доступных только пользователям с определенной ролью
const RolePage = async ({ children, rolesWithAccess = ['USER', 'ADMIN', 'SUPPORT'] }) => {
  const currentCustomer = (await getCurrentCustomerData())?.data;

  if (currentCustomer && currentCustomer.role && currentCustomer.role.some(role => rolesWithAccess.includes(role))) {
    return (
      <>{children}</>
    );
  }

  return null;
}

export default RolePage;