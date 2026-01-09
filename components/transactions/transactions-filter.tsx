"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

function TransactionsFilter({
  year,
  month,
  yearRange,
}: TransactionsFilterProps) {
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-2">
      <fieldset className="col-span-3 flex items-center gap-2">
        <Select
          name="month"
          value={selectedMonth.toString()}
          onValueChange={(newValue) => setSelectedMonth(Number(newValue))}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={format(
                new Date(selectedYear, selectedMonth - 1, 1),
                "MMM",
              )}
            />
          </SelectTrigger>
          <SelectContent className="mt-12">
            {Array.from({ length: 12 }).map((_, index) => (
              <SelectItem key={index} value={(index + 1).toString()}>
                {format(new Date(selectedYear, index, 1), "MMM")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          name="year"
          value={selectedYear.toString()}
          onValueChange={(newValue) => setSelectedYear(Number(newValue))}
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

      <Button type="submit" className="col-span-2" asChild>
        <Link
          href={`/dashboard/transactions?year=${selectedYear}&month=${selectedMonth}`}
        >
          Search
        </Link>
      </Button>
      <Button type="button" asChild>
        <Link href={"/dashboard/transactions"}>Back</Link>
      </Button>
    </div>
  );
}

export default TransactionsFilter;
