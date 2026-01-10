import "server-only";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getRecentTransactions() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        transactions: null,
        message: "To view transactions you have to be logged in!",
      };
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      include: { category: { select: { type: true, name: true } } },
      orderBy: { transactionDate: "desc" },
      take: 5,
    });

    return {
      success: true,
      transactions,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      transactions: null,
      message: "An error occurred while fetching your recent transactions.",
    };
  }
}
