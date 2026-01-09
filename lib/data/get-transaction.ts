import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import "server-only";

export async function getTransactionById(id: string) {
  try {
    const { userId } = await auth();
    if (!userId)
      return {
        success: false,
        transaction: null,
        message: "To view transactions you have to be logged in!",
      };

    const transaction = await prisma.transaction.findUnique({
      where: { id, userId },
      include: { category: { select: { type: true } } },
    });
    return {
      success: true,
      transaction,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred while fetching this transaction.",
    };
  }
}
