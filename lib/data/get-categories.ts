import "server-only";

import { prisma } from "@/lib/prisma";

export async function getCategories() {
  return prisma.category.findMany();
}
