import Recent from "@/components/transactions/recent";
import TransactionsGraph from "@/components/transactions/transactions-graph";
import { TODAY } from "@/lib/consts/consts";
import { getRecentTransactions } from "@/lib/data/get-recent-transactions";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ cfyear?: string }>;
}) {
  const params = await searchParams;
  const parsed = params.cfyear ? Number(params.cfyear) : NaN;
  const cfYear = !isNaN(parsed) ? parsed : TODAY.getFullYear();

  const result = await getRecentTransactions();
  if (!result.success) {
    throw new Error("Failed to load recent transactions");
  }

  const transactions = result.transactions ?? [];

  return (
    <section className="grid grid-cols-1 gap-8">
      <Suspense fallback={<h1>xd</h1>}>
        <TransactionsGraph year={cfYear} />
      </Suspense>

      <Recent transactions={transactions} />
    </section>
  );
}
