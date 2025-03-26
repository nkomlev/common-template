import { NextAdmin } from "@premieroctet/next-admin";
import { getNextAdminProps } from "@premieroctet/next-admin/appRouter";
import prisma from "../../../../../prisma";
import "../../../../../nextAdminCss.css";
import options from "../../../../../nextAdminOptions";
import Dashboard from "@/components/dashboard/Dashboard";
import RolePage from "@/components/roleComponents/RolePage";
import { getNextAdminUserData } from "@/lib/getNextAdminUserData";

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

  return (
    <RolePage rolesWithAccess={['ADMIN']}>
      <NextAdmin
        dashboard={<Dashboard />}
        user={await getNextAdminUserData()}
        {...props}
      />
    </RolePage>
  );
}