/**
 * 六级工具专用的 Prisma 客户端（独立 SQLite 库）。
 *
 * 注意：这里刻意不复用 src/lib/prisma.ts —— 那个连的是旧应用的 PostgreSQL，
 * 两套库互不影响。所有六级数据都走这个 client。
 */
import { PrismaClient } from "@/generated/cet6"

const globalForCet6 = globalThis as unknown as { cet6Prisma?: PrismaClient }

export const db =
  globalForCet6.cet6Prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForCet6.cet6Prisma = db
