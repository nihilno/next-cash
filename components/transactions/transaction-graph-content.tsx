"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { months } from "@/lib/consts/consts";
import { usd } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function TransactionGraphContent({
  annualCashflow,
}: {
  annualCashflow: AnnualCashflow[];
}) {
  return (
    <div className="flex flex-col">
      <ChartContainer
        config={{
          income: {
            label: "Income",
            color: "var(--color-foreground)",
          },
          expense: { label: "Expenses", color: "var(--color-destructive)" },
        }}
        className="h-75 w-full"
      >
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={annualCashflow}>
            <CartesianGrid vertical={false} />
            <YAxis tickFormatter={(v) => usd.format(v)} width={55} />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => months[value] || value}
            />
            <ChartTooltip
              content={<ChartTooltipContent labelFormatter={() => ""} />}
            />
            <Legend
              align="left"
              iconType="circle"
              height={1}
              formatter={(value) => {
                return (
                  <span className="text-foreground capitalize">{value}</span>
                );
              }}
            />
            <Bar dataKey={"income"} radius={4} fill="var(--color-foreground)" />
            <Bar
              dataKey={"expense"}
              radius={4}
              fill="var(--color-destructive)"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

export default TransactionGraphContent;
