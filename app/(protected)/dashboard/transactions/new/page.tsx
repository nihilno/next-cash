import TransactionForm from "@/components/transactions/transactions-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createTransaction } from "@/lib/actions/transactions";
import { getCategories } from "@/lib/data/get-categories";
import { PlusCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Transaction",
};

export default async function NewTransactionPage() {
  const categories = await getCategories();

  return (
    <Card className="max-w-4xl">
      <CardHeader className="pt-12">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <PlusCircle /> New Transaction
        </CardTitle>
        <CardDescription>
          Fill in the details for your new transaction.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        <TransactionForm
          categories={categories}
          serverAction={createTransaction}
        />
      </CardContent>
    </Card>
  );
}
