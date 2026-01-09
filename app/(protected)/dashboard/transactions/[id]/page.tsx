import TransactionForm from "@/components/transactions/transactions-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { editTransaction } from "@/lib/actions/transactions";
import { getCategories } from "@/lib/data/get-categories";
import { getTransactionById } from "@/lib/data/get-transaction";
import { Edit } from "lucide-react";
import { notFound } from "next/navigation";
import { isValid } from "ulidx";

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isValid(id)) notFound();

  const categories = await getCategories();
  if (!categories) notFound();

  const result = await getTransactionById(id);
  if (!result.success) notFound();

  const { transaction } = result;
  if (!transaction) notFound();

  const defaultValues = {
    amount: transaction.amount,
    categoryId: transaction.categoryId,
    description: transaction.description ?? "",
    transactionDate: transaction.transactionDate,
    transactionType: transaction.category.type,
  };

  return (
    <Card>
      <CardHeader className="pt-12">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Edit />
          Edit Transaction
        </CardTitle>
        <CardDescription>
          Make changes to this transaction whenever something needs updating.
        </CardDescription>
      </CardHeader>
      <CardContent className="border-muted-foreground/50 border-b border-dashed py-4">
        <TransactionForm
          categories={categories}
          defaultValues={defaultValues}
          mode="edit"
          id={id}
          serverAction={editTransaction}
        />
      </CardContent>
      <CardFooter className="text-muted-foreground mx-auto mt-auto px-10 text-center text-xs">
        ID: {id}
      </CardFooter>
    </Card>
  );
}
