"use client";

import { Spinner as Loader } from "@/components/ui/shadcn-io/spinner";

function Spinner() {
  return (
    <Loader
      variant="pinwheel"
      size={48}
      color="var(--color-foreground)"
      opacity={50}
    />
  );
}

export default Spinner;
