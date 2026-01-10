"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

function CashflowFilter({ year, yearRange }: CashflowFilterProps) {
  const { push } = useRouter();

  return (
    <fieldset className="flex items-center gap-2">
      <Select
        defaultValue={year.toString()}
        value={year.toString()}
        onValueChange={(value) => {
          push(`/dashboard?cfyear=${value}`);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={year} />
        </SelectTrigger>
        <SelectContent className="mt-12">
          {yearRange.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </fieldset>
  );
}

export default CashflowFilter;
