"use client";

import { SearchX } from "lucide-react";

function TransactionsTableFallback() {
  return (
    <div className="py-24">
      <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-center">
        <SearchX className="size-6" />
        <h3 className="text-sm leading-tight">
          There are no transactions <br /> for this time period.
        </h3>
      </div>
    </div>
  );
}

export default TransactionsTableFallback;
