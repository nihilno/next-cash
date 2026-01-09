import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import "server-only";

export async function getTransactions({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        transactions: null,
        message: "To view transactions you have to be logged in!",
      };
    }

    const earliestDate = new Date(year, month - 1, 1);
    const latestDate = new Date(year, month, 0);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        transactionDate: {
          gte: earliestDate,
          lte: latestDate,
        },
      },
      include: { category: { select: { type: true, name: true } } },
      orderBy: { transactionDate: "desc" },
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
      message: "An error occurred while fetching your transactions.",
    };
  }
}
