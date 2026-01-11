import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGraphData } from "@/lib/data/get-graph-data";
import { getTransactionsYearsRange } from "@/lib/data/get-years-range";
import { usd } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import CashflowFilter from "./cashflow-filter";
import TransactionGraphContent from "./transaction-graph-content";

async function TransactionsGraph({ year }: { year: number }) {
  const [{ graphData }, { range }] = await Promise.all([
    getGraphData(year),
    getTransactionsYearsRange(),
  ]);

  if (!graphData || graphData.length === 0) {
    return null;
  }

  const totalIncome = graphData?.reduce((prev: number, month) => {
    return prev + month.income;
  }, 0);
  const totalExpense = graphData?.reduce((prev: number, month) => {
    return prev + month.expense;
  }, 0);
  const balance = totalIncome - totalExpense;
  const trendingUp = balance > 0;

  return (
    <Card>
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
      <CardContent className="grid grid-cols-1 py-4 lg:grid-cols-[4fr_1fr]">
        <TransactionGraphContent annualCashflow={graphData} />

        <div className="ml-2 hidden w-full flex-col gap-6 border-l md:pl-4 lg:flex lg:pl-6">
          <div>
            <span className="text-muted-foreground text-sm xl:text-base">
              Income
            </span>
            <h2 className="text-2xl xl:text-3xl">{usd.format(totalIncome)}</h2>
          </div>
          <div className="border-t pt-2">
            <span className="text-muted-foreground text-sm xl:text-base">
              Expenses
            </span>
            <h2 className="text-2xl xl:text-3xl">{usd.format(totalExpense)}</h2>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <div>
              <span className="text-muted-foreground text-sm xl:text-base">
                Balance
              </span>
              <h2 className="text-2xl xl:text-3xl">{usd.format(balance)}</h2>
            </div>
            <div className="pr-4">
              {trendingUp ? (
                <TrendingUp className="size-6 animate-pulse text-green-700 xl:size-10" />
              ) : (
                <TrendingDown className="size-6 animate-pulse text-red-700 xl:size-10" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TransactionsGraph;
