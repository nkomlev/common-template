import { NextAdmin } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import prisma from "@common/prisma";
import options from "../../../../../nextAdminOptions";
import '../../../../../nextAdminCss.css';
import Dashboard from "@/components/dashboard/Dashboard";
import RolePage from "@common-templates/shared/components/roleComponents/RolePage";
import { getNextAdminUserData } from "@/lib/getNextAdminUserData";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export default async function AdminPage({
  params,
  searchParams,
}) {
  const { nextadmin } = await params;
  const props = await getNextAdminProps({
    params: nextadmin,
    searchParams: await searchParams,
    basePath: "/auth/admin",
    apiBasePath: "/api/auth/admin",
    prisma,
    options
  });
  const cookiesStore = await cookies();

  return (
    <RolePage
      rolesWithAccess={['ADMIN']}
      noRoleHandler={() => redirect('/')}
      currentCustomerId={Number(cookiesStore.get('customerId').value)}
    >
      <NextAdmin
        dashboard={<Dashboard />}
        user={await getNextAdminUserData()}
        {...props}
      />
    </RolePage>
  );
}