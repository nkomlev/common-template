import {getCurrentCustomerData} from "@/server/actions/getCurrentCustomerData";

const GroupPage = async ({ children, groupsWithAccess = [] }) => {
  const currentCustomer = (await getCurrentCustomerData())?.data;

  if (currentCustomer && currentCustomer.group && currentCustomer.group.some(group => groupsWithAccess.includes(group.name))) {
    return (
      <>{children}</>
    );
  }

  return null;
}

export default GroupPage;