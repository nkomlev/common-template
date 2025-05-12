import { PrismaClient } from './packages/shared/prisma/client'

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
