"use server";

import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/lib/schemas";
import { auth } from "@clerk/nextjs/server";

export async function createTransaction(formData: unknown) {
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      message: "To perform this action you need to be logged in.",
    };
  }

  const result = transactionSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message:
        result.error.issues[0].message ||
        "An error occured while creating a transaction.",
    };
  }

  const { amount, description, transactionDate, categoryId } = result.data;

  try {
    await prisma.transaction.create({
      data: {
        userId,
        amount,
        description,
        categoryId,
        transactionDate,
      },
    });

    return {
      success: true,
      message: "Transaction created successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured while creating a transaction.",
    };
  }
}
