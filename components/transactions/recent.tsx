import TransactionsTable from "@/components/transactions/transactions-table";
import TransactionsTableFallback from "@/components/transactions/transactions-table-fallback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function Recent({ transactions }: { transactions: TransactionWithCategory[] }) {
  const isEmpty = transactions.length === 0;

  return (
    <Card>
      <CardHeader className="pt-6">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Activity />
          Recent Transactions
        </CardTitle>
        <CardDescription>
          View your latest income and expenses in chronological order
        </CardDescription>
      </CardHeader>
      <CardContent className="border-muted-foreground/50 border-b border-dashed py-4">
        {isEmpty ? (
          <TransactionsTableFallback />
        ) : (
          <Suspense fallback={<h1>Sus recent</h1>}>
            <TransactionsTable transactions={transactions} />
          </Suspense>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-end gap-2 px-10">
        {isEmpty ? (
          <Button variant={"outline"} disabled>
            View All
          </Button>
        ) : (
          <Button variant={"outline"} asChild>
            <Link href="/dashboard/transactions">View All</Link>
          </Button>
        )}
        <Button asChild>
          <Link
            href="/dashboard/transactions/new"
            className="flex items-center gap-1"
          >
            <PlusCircle /> Create New
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Recent;
