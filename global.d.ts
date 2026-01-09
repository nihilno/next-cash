import { Transaction } from "./lib/generated/prisma/client";

declare global {
  type DatePickerProps = {
    value: Date;
    onChange: (date: Date | undefined) => void;
  };

  type TransactionWithCategory = Transaction & {
    category: { type: Type; name: string };
  };

  type TransactionsFilterProps = {
    year: number;
    month: number;
    yearRange: number[];
  };

  type TransactionFormProps = {
    categories: Category[];
    defaultValues?: {
      description: string | undefined;
      amount: number;
      categoryId: number;
      transactionDate: Date;
      transactionType: "Income" | "Expense";
    };
  };
}

export {};
