import prisma from "../../../../../../prisma";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import options from "../../../../../../nextAdminOptions";

// Стандартный хендлер, необходимый для работы next-admin
const { run } = createHandler({
  apiBasePath: "/api/auth/admin",
  prisma,
  options
});
 
export { run as DELETE, run as GET, run as POST };
