import { redirect } from "next/navigation";
import {getCurrentCustomerData} from "@/server/actions/getCurrentCustomerData";

const GroupPage = async ({ children, groupsWithAccess = [] }) => {
  const currentCustomer = (await getCurrentCustomerData())?.data;

  if (!currentCustomer || !currentCustomer.group || !currentCustomer.group.some(group => groupsWithAccess.includes(group.name))) {
    redirect('/');
  }

  return (
    <>{children}</>
  );
}

export default GroupPage;