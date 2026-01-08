import TransactionForm from "@/components/transaction-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategories } from "@/lib/data/get-categories";
import { PlusCircle } from "lucide-react";

export default async function NewTransactionPage() {
  const categories = await getCategories();
  console.log(categories);

  return (
    <Card className="max-w-3xl">
      <CardHeader className="pt-12">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <PlusCircle /> New Transaction
        </CardTitle>
        <CardDescription>
          Fill in the details for your new transaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionForm categories={categories} />
      </CardContent>
    </Card>
  );
}
