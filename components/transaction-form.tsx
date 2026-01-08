"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/lib/generated/prisma/client";
import { newTransactionSchema, newTransactionType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "./date-picker";

function TransactionForm({ categories }: { categories: Category[] }) {
  const { push } = useRouter();
  const form = useForm<newTransactionType>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      transactionType: "Expense",
      categoryId: undefined,
      transactionDate: new Date(),
      amount: undefined,
      description: "",
    },
  });

  async function onSubmit(formData: newTransactionType) {
    console.log(formData);
    form.reset();
  }

  const transactionType = form.watch("transactionType");
  const filteredCategories = categories.filter(
    (prev) => prev.type === transactionType,
  );

  useEffect(() => {
    form.setValue("categoryId", undefined, {
      // shouldValidate: true,
      // shouldDirty: true,
      // shouldTouch: true,
    });

    form.clearErrors("categoryId");
  }, [transactionType, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Expense">Expense</SelectItem>
                      <SelectItem value="Income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCategories.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="transactionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Date</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Provide an amount."
                    className="text-sm"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="sm:col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Uber ride."
                    className="text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-2 sm:col-span-2 sm:grid-cols-2">
          <Button type="submit" className="w-full">
            Save Draft
          </Button>

          <Button
            type="button"
            className="w-full"
            variant={"outline"}
            onClick={() => push("/dashboard/transactions")}
          >
            Cancel Draft
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TransactionForm;
