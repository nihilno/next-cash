import { prisma } from "@/lib/prisma";

const transactions = [
  {
    transactionType: "Income",
    categoryId: 1,
    transactionDate: new Date("2026-01-10"),
    amount: 4200,
    description: "Received final payment for a large freelance project.",
  },
  {
    transactionType: "Expense",
    categoryId: 5,
    transactionDate: new Date("2026-01-09"),
    amount: 118,
    description: "Bought groceries for the weekend meals.",
  },
  {
    transactionType: "Expense",
    categoryId: 3,
    transactionDate: new Date("2026-01-09"),
    amount: 62,
    description: "Paid for a taxi ride to a client meeting.",
  },
  {
    transactionType: "Income",
    categoryId: 1,
    transactionDate: new Date("2026-01-08"),
    amount: 300,
    description: "Earned a small bonus from a quick design task.",
  },
  {
    transactionType: "Expense",
    categoryId: 7,
    transactionDate: new Date("2026-01-08"),
    amount: 45,
    description: "Grabbed coffee and snacks while working remotely.",
  },
  {
    transactionType: "Expense",
    categoryId: 4,
    transactionDate: new Date("2026-01-07"),
    amount: 205,
    description: "Paid the monthly electricity bill.",
  },
  {
    transactionType: "Expense",
    categoryId: 6,
    transactionDate: new Date("2026-01-07"),
    amount: 90,
    description: "Renewed gym membership for the month.",
  },
  {
    transactionType: "Income",
    categoryId: 2,
    transactionDate: new Date("2026-01-06"),
    amount: 1500,
    description: "Received a performance bonus from a long-term client.",
  },
  {
    transactionType: "Expense",
    categoryId: 5,
    transactionDate: new Date("2026-01-06"),
    amount: 132,
    description: "Restocked weekly groceries and household items.",
  },
  {
    transactionType: "Expense",
    categoryId: 3,
    transactionDate: new Date("2026-01-05"),
    amount: 52,
    description: "Paid for a bus pass for local travel.",
  },
  {
    transactionType: "Expense",
    categoryId: 8,
    transactionDate: new Date("2026-01-05"),
    amount: 78,
    description: "Rented a movie and ordered snacks for a quiet evening.",
  },
  {
    transactionType: "Income",
    categoryId: 1,
    transactionDate: new Date("2026-01-04"),
    amount: 820,
    description: "Completed a quick weekend coding task for a client.",
  },
  {
    transactionType: "Expense",
    categoryId: 5,
    transactionDate: new Date("2026-01-04"),
    amount: 112,
    description: "Bought ingredients for meal prep for the week.",
  },
  {
    transactionType: "Expense",
    categoryId: 9,
    transactionDate: new Date("2026-01-03"),
    amount: 295,
    description: "Purchased a new keyboard for the home office.",
  },
  {
    transactionType: "Expense",
    categoryId: 7,
    transactionDate: new Date("2026-01-03"),
    amount: 42,
    description: "Stopped for coffee during a morning walk.",
  },
  {
    transactionType: "Income",
    categoryId: 2,
    transactionDate: new Date("2026-01-02"),
    amount: 500,
    description: "Received a referral bonus from a partner company.",
  },
  {
    transactionType: "Expense",
    categoryId: 5,
    transactionDate: new Date("2026-01-02"),
    amount: 97,
    description: "Bought fresh produce and bakery items.",
  },
  {
    transactionType: "Expense",
    categoryId: 3,
    transactionDate: new Date("2026-01-01"),
    amount: 55,
    description: "Paid for a tram ride to visit family.",
  },
  {
    transactionType: "Expense",
    categoryId: 4,
    transactionDate: new Date("2026-01-01"),
    amount: 182,
    description: "Settled the monthly water and heating bill.",
  },
  {
    transactionType: "Income",
    categoryId: 1,
    transactionDate: new Date("2026-01-01"),
    amount: 250,
    description: "Received a small New Year’s gift from a client.",
  },
  {
    transactionType: "Income",
    categoryId: 1,
    transactionDate: new Date("2025-12-31"),
    amount: 4000,
    description: "Monthly salary arrived just before New Year’s Eve.",
  },
  {
    transactionType: "Expense",
    categoryId: 5,
    transactionDate: new Date("2025-12-30"),
    amount: 148,
    description: "Bought groceries for New Year’s dinner.",
  },
  {
    transactionType: "Expense",
    categoryId: 8,
    transactionDate: new Date("2025-12-29"),
    amount: 225,
    description: "Purchased decorations and snacks for a New Year’s party.",
  },
  {
    transactionType: "Expense",
    categoryId: 3,
    transactionDate: new Date("2025-12-28"),
    amount: 72,
    description: "Paid for a taxi after a late evening out.",
  },
  {
    transactionType: "Income",
    categoryId: 2,
    transactionDate: new Date("2025-12-27"),
    amount: 620,
    description: "Completed a small holiday-themed project for a client.",
  },
  {
    transactionType: "Expense",
    categoryId: 7,
    transactionDate: new Date("2025-12-26"),
    amount: 36,
    description: "Bought coffee while shopping for gifts.",
  },
  {
    transactionType: "Expense",
    categoryId: 9,
    transactionDate: new Date("2025-12-25"),
    amount: 310,
    description: "Purchased Christmas gifts for family members.",
  },
  {
    transactionType: "Expense",
    categoryId: 5,
    transactionDate: new Date("2025-12-24"),
    amount: 182,
    description: "Bought ingredients for Christmas Eve dinner.",
  },
  {
    transactionType: "Income",
    categoryId: 1,
    transactionDate: new Date("2025-12-20"),
    amount: 200,
    description: "Received a small holiday bonus from a client.",
  },
  {
    transactionType: "Expense",
    categoryId: 4,
    transactionDate: new Date("2025-12-18"),
    amount: 158,
    description: "Paid the monthly internet bill.",
  },
];

async function main() {
  console.log("Start seeding categories...");

  const userId = "user_37yY6wXhy6scLIs2KaOQSe7S6dD";

  await prisma.transaction.deleteMany();

  for (const t of transactions) {
    await prisma.transaction.create({
      data: {
        categoryId: t.categoryId,
        transactionDate: t.transactionDate,
        amount: t.amount,
        description: t.description,
        userId,
      },
    });
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
