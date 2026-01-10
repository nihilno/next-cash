import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import "server-only";

export async function getGraphData(year: number) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        graphData: null,
        message: "To view transactions you have to be logged in!",
      };
    }

    const rawGraphData = await prisma.$queryRaw<
      {
        month: number;
        totalIncome: number;
        totalExpenses: number;
      }[]
    >`
        SELECT 
            EXTRACT(MONTH FROM t."transaction_date")::int AS month,

            SUM(
            CASE 
                WHEN c."type" = 'Income' THEN t."amount"
                ELSE 0
            END
            ) AS "totalIncome",

            SUM(
            CASE 
                WHEN c."type" = 'Expense' THEN t."amount"
                ELSE 0
            END
            ) AS "totalExpenses"

        FROM "transactions" t
        JOIN "categories" c ON c."id" = t."category_id"

        WHERE t."user_id" = ${userId}
            AND EXTRACT(YEAR FROM t."transaction_date") = ${year}

        GROUP BY month
        ORDER BY month;
    `;

    const cashflow: {
      month: number;
      income: number;
      expense: number;
    }[] = [];

    for (let month = 1; month <= 12; month++) {
      const monthly = rawGraphData.find((r) => Number(r.month) === month);
      cashflow.push({
        month,
        income: Number(monthly?.totalIncome ?? 0),
        expense: Number(monthly?.totalExpenses ?? 0),
      });
    }

    return {
      success: true,
      graphData: cashflow,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      graphData: null,
      message: "An error occurred while fetching your recent transactions.",
    };
  }
}
