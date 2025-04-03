import { PrismaClient } from "./generated-prisma-client/prisma-client";

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
