import prisma from "../../../../../../../../prisma.js";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import options from "../../../../../../nextAdminOptions";

const { run } = createHandler({
  apiBasePath: "/api/auth/admin",
  prisma,
  options
});
 
export { run as DELETE, run as GET, run as POST };
