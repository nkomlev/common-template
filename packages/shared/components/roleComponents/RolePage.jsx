import {getCurrentCustomerData} from "../../server/functions/getCurrentCustomerData";

// Компонент-обертка для создания страницы, доспуной только пользователям с определенными ролями
const RolePage = async ({ children, rolesWithAccess = ['USER', 'ADMIN', 'SUPPORT'], currentCustomerId, noRoleHandler }) => {
  const currentCustomer = (await getCurrentCustomerData(currentCustomerId))?.data;

  // Если у пользователя нет необходимой роли, то отправляем его на главную
  if (!currentCustomer || !currentCustomer.role || !currentCustomer.role.some(role => rolesWithAccess.includes(role))) {
    if (typeof noRoleHandler === 'function') {
      noRoleHandler();
    } else {
      console.error('noRoleHandler prop is expected to be a functions')
    }
  }

  return (
    <>{children}</>
  );
}

export default RolePage;