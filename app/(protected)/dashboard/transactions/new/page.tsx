import TransactionForm from "@/components/transaction-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function NewTransactionPage() {
  return (
    <Card className="max-w-3xl pt-12">
      <CardContent className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <PlusCircle /> New Transaction
          </CardTitle>
          <CardDescription>
            Fill in the details for your new transaction.
          </CardDescription>
        </CardHeader>

        <div className="my-10 h-full flex-1">
          <TransactionForm />
        </div>
      </CardContent>
    </Card>
  );
}
