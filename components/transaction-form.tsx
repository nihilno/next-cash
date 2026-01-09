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
import { createTransaction } from "@/lib/actions/transactions";
import { Category } from "@/lib/generated/prisma/client";
import { newTransactionSchema, newTransactionType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DatePicker } from "./date-picker";

function TransactionForm({ categories }: { categories: Category[] }) {
  const { push } = useRouter();
  const form = useForm<newTransactionType>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      transactionType: "Expense",
      categoryId: 0,
      transactionDate: new Date(),
      amount: undefined,
      description: "",
    },
  });

  const { replace } = useRouter();

  async function onSubmit(formData: newTransactionType) {
    const { success, message } = await createTransaction(formData);
    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
      form.reset();
      replace("/dashboard/transactions");
    }

    // console.log(formData);
  }

  const transactionType = form.watch("transactionType");
  const filteredCategories = categories.filter(
    (prev) => prev.type === transactionType,
  );

  const disabled = form.formState.isSubmitting;

  useEffect(() => {
    form.setValue("categoryId", 0);
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCategories.map(({ id, name }) => (
                        <SelectItem key={id} value={String(id)}>
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
                    placeholder="Electricity bill."
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
          <Button type="submit" className="w-full" disabled={disabled}>
            <div className="flex items-center gap-1">
              {disabled && <Loader2Icon className="animate-spin" />}
              <span>Save Draft</span>
            </div>
          </Button>
          <Button
            type="button"
            className="w-full"
            onClick={() => form.reset()}
            disabled={disabled}
          >
            Clear Draft
          </Button>
          <Button
            type="button"
            className="w-full"
            variant={"outline"}
            onClick={() => push("/dashboard/transactions")}
            disabled={disabled}
          >
            Cancel Draft
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default TransactionForm;
