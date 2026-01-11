"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Home, RotateCw, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Lost({ regular = true }: { regular?: boolean }) {
  const { refresh } = useRouter();

  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center justify-center text-center">
        <XCircle className="text-muted-foreground mb-4 h-12 w-12" />
        <h2 className="mb-2 text-2xl font-semibold">
          {regular ? "Page not Found" : "Transaction not Found"}
        </h2>
        <p className="mt-4 max-w-sm text-sm opacity-60">
          {regular
            ? "The page you're trying to reach isn't available right now. It may have been moved, deleted, or never existed in the first place."
            : "The transaction you're looking for isn't available right now. It may have been entered incorrectly, removed, or never existed in the first place."}
        </p>
        <div className="mt-6 space-x-2">
          <Button asChild>
            {regular ? (
              <Link href="/dashboard">
                <Home /> <span>Back to Dashboard</span>
              </Link>
            ) : (
              <Link href="/dashboard/transactions">
                <ArrowLeftRight /> <span>Back to Transactions</span>
              </Link>
            )}
          </Button>
          <Button onClick={() => refresh()} variant="outline">
            <RotateCw /> <span>Reload</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Lost;
