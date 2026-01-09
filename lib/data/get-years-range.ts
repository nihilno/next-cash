import { TODAY } from "@/lib/consts/consts";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import "server-only";

export async function getTransactionsYearsRange() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        range: [],
      };
    }

    // getting oldest
    const [oldest] = await prisma.transaction.findMany({
      where: { userId },
      orderBy: {
        transactionDate: "asc",
      },
      take: 1,
    });

    const currentYear = TODAY.getFullYear();
    const oldestYear = oldest
      ? new Date(oldest.transactionDate).getFullYear()
      : currentYear;

    const range = Array.from({ length: currentYear - oldestYear + 1 }).map(
      (_, index) => currentYear - index,
    );

    return {
      success: true,
      range,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      range: [],
      message: "An error occurred while fetching your transactions.",
    };
  }
}
