"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RotateCw } from "lucide-react";
import Link from "next/link";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center justify-center text-center">
        <AlertCircle className="text-muted-foreground mb-4 h-12 w-12" />
        <h2 className="mb-2 text-2xl font-semibold">Something went wrong.</h2>
        <p className="mt-4 max-w-md text-sm opacity-60">
          {error.message ||
            "An error occured, but don't worry — we'll get you back."}
        </p>
        <div className="mt-6 space-x-2">
          <Button onClick={reset} variant="outline">
            <RotateCw /> <span>Reload</span>
          </Button>
          <Link href="/">
            <Button>
              <Home /> <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-xs opacity-75">
          Error ID: {error.digest || "Not known yet."}
        </p>
      </div>
    </section>
  );
}

export default Error;
