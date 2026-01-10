import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGraphData } from "@/lib/data/get-graph-data";
import { getTransactionsYearsRange } from "@/lib/data/get-years-range";
import { TrendingUp } from "lucide-react";
import CashflowFilter from "./cashflow-filter";

async function TransactionsGraph({ year }: { year: number }) {
  const [{ graphData }, { range }] = await Promise.all([
    getGraphData(year),
    getTransactionsYearsRange(),
  ]);

  return (
    <Card className="max-w-4xl">
      <CardHeader className="pt-6">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl">
            <TrendingUp /> Cashflow
          </div>
          <CashflowFilter year={year} yearRange={range} />
        </CardTitle>
        <CardDescription>
          Track how your money moves each month.
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4"></CardContent>
    </Card>
  );
}

export default TransactionsGraph;
