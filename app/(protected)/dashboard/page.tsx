import Recent from "@/components/transactions/recent";
import TransactionsGraph from "@/components/transactions/transactions-graph";
import { TODAY } from "@/lib/consts/consts";
import { getRecentTransactions } from "@/lib/data/get-recent-transactions";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ cfyear: string }>;
}) {
  const params = await searchParams;
  let cfYear = Number(params.cfyear) ?? TODAY.getFullYear();

  if (isNaN(cfYear)) {
    cfYear = TODAY.getFullYear();
  }

  const result = await getRecentTransactions();
  if (!result.success) {
    throw new Error("Failed to load recent transactions");
  }

  const transactions = result.transactions ?? [];

  return (
    <section className="grid grid-cols-1 gap-8">
      <TransactionsGraph year={cfYear} />
      <Recent transactions={transactions} />
    </section>
  );
}
