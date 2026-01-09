"use server";

import { prisma } from "@/lib/prisma";
import { transactionSchema } from "@/lib/schemas";
import { auth } from "@clerk/nextjs/server";

export async function createTransaction(formData: unknown) {
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      transactionDate: null,
      message: "To perform this action you need to be logged in.",
    };
  }

  const result = transactionSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message:
        result.error.issues[0].message ??
        "An error occurred while creating a transaction.",
      transactionDate: null,
    };
  }
  const { amount, description, transactionDate, categoryId } = result.data;

  try {
    const transaction = await prisma.transaction.create({
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
      transactionDate: transaction.transactionDate,
      message: "Transaction created successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      transactionDate: null,
      message: "An error occurred while creating a transaction.",
    };
  }
}

export async function editTransaction(
  formData: unknown,
  id: string | undefined,
) {
  const { userId } = await auth();
  if (!userId) {
    return {
      success: false,
      message: "To perform this action you need to be logged in.",
      transactionDate: null,
    };
  }

  const result = transactionSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message:
        result.error.issues[0].message ??
        "An error occurred while editing a transaction.",
      transactionDate: null,
    };
  }
  const { amount, description, transactionDate, categoryId } = result.data;

  try {
    const transaction = await prisma.transaction.update({
      where: { userId, id },
      data: { amount, description, categoryId, transactionDate },
    });

    return {
      success: true,
      transactionDate: transaction.transactionDate,
      message: "Transaction updated successfully.",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      transactionDate: null,
      message: "An error occurred while editing a transaction.",
    };
  }
}
