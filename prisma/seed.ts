// seed.ts

import { prisma } from "@/lib/prisma";

const categories = [
  { name: "Salary", type: "Income" as const },
  { name: "Rental Income", type: "Income" as const },
  { name: "Business Income", type: "Income" as const },
  { name: "Investments", type: "Income" as const },
  { name: "Other", type: "Income" as const },
  { name: "Housing", type: "Expense" as const },
  { name: "Transport", type: "Expense" as const },
  { name: "Food & Groceries", type: "Expense" as const },
  { name: "Health", type: "Expense" as const },
  { name: "Entertainment & Leisure", type: "Expense" as const },
  { name: "Other", type: "Expense" as const },
];

async function main() {
  console.log("Start seeding categories...");

  // Optional: delete existing categories to make the seed idempotent
  await prisma.category.deleteMany();

  for (const category of categories) {
    const created = await prisma.category.create({
      data: {
        name: category.name,
        type: category.type,
      },
    });
    console.log(`Created category: ${created.name} (${created.type})`);
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
