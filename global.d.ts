import { type Category, type Transaction } from "./lib/generated/prisma/client";
import { newTransactionType } from "./lib/schemas";

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
    defaultValues?: Partial<newTransactionType>;
    mode?: "add" | "edit";
    transactionId?: string;
    serverAction: TransactionAction;
  };
}

export {};
