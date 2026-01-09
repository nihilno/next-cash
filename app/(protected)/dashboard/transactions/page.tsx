import TransactionsFilter from "@/components/transactions/transactions-filter";
import TransactionsTable from "@/components/transactions/transactions-table";
import TransactionsTableFallback from "@/components/transactions/transactions-table-fallback";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTransactions } from "@/lib/data/get-transactions";
import { getTransactionsYearsRange } from "@/lib/data/get-years-range";
import { dateSchema } from "@/lib/schemas";
import { format } from "date-fns";
import { ArrowLeftRight } from "lucide-react";
import { notFound } from "next/navigation";

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>;
}) {
  const params = await searchParams;
  const { month, year } = dateSchema.parse(params);
  const date = new Date(year, month - 1, 1);

  const result = await getTransactions({ month, year });
  if (!result.success) {
    notFound();
  }
  const { transactions } = result;

  const years = await getTransactionsYearsRange();
  if (!years.success) {
    notFound();
  }
  const { range } = years;

  return (
    <Card>
      <CardHeader className="pt-12">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <ArrowLeftRight />
          Transactions: <span>{format(date, "MMM yyyy")}</span>
        </CardTitle>
        <CardDescription>
          Review, edit, and delete your transactions for this period.
        </CardDescription>
      </CardHeader>
      <CardContent className="border-muted-foreground/50 border-b border-dashed py-4">
        {!transactions || transactions.length === 0 ? (
          <TransactionsTableFallback />
        ) : (
          <TransactionsTable transactions={transactions} />
        )}
      </CardContent>
      <CardFooter className="mt-auto">
        <TransactionsFilter year={year} month={month} yearRange={range} />
      </CardFooter>
    </Card>
  );
}
