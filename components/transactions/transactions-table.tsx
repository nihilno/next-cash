import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Edit } from "lucide-react";
import Link from "next/link";

function TransactionsTable({
  transactions,
}: {
  transactions: TransactionWithCategory[];
}) {
  return (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground">Date</TableHead>
          <TableHead className="text-muted-foreground">Description</TableHead>
          <TableHead className="text-muted-foreground">Type</TableHead>
          <TableHead className="text-muted-foreground">Category</TableHead>
          <TableHead className="text-muted-foreground font-medium">
            Amount
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(
          ({
            id,
            amount,
            transactionDate,
            description,
            category: { name, type },
          }) => (
            <TableRow key={id}>
              <TableCell>
                {transactionDate
                  ? format(new Date(transactionDate), "do MMM")
                  : "—"}
              </TableCell>
              <TableCell>{description || "—"}</TableCell>
              <TableCell>
                <Badge variant={type === "Expense" ? "destructive" : "default"}>
                  {type}
                </Badge>
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(amount)}
              </TableCell>
              <TableCell className="text-right font-medium">
                <Button
                  variant={"ghost"}
                  size={"icon-sm"}
                  asChild
                  aria-label="Edit Transaction"
                >
                  <Link href={`/dashboard/transactions/${id}`}>
                    <Edit />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}

export default TransactionsTable;
