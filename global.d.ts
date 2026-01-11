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

  type CashflowFilterProps = {
    year: number;
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

  type RecentProps = {
    transactions: TransactionWithCategory[];
    isEmpty: boolean;
  };

  type DeleteBtnProps = {
    onDelete: (id: string | undefined) => Promise<void>;
    id: string | undefined;
    isDeleting: boolean;
    disabled: boolean;
  };

  type AnnualCashflow = {
    month: number;
    income: number;
    expense: number;
  };
}

export {};
