import { prisma } from "@/lib/prisma";
import "server-only";

export async function getCategories() {
  return prisma.category.findMany();
}
