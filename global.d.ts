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

  type TransactionAction = (
    formData: unknown,
    id?: string,
  ) => Promise<{
    success: boolean;
    message: string;
    transactionDate: Date | null;
  }>;

  type TransactionFormProps = {
    categories: Category[];
    defaultValues?: Partial<newTransactionType>;
    mode?: "add" | "edit";
    id?: string;
    serverAction: TransactionAction;
  };
}

export {};
