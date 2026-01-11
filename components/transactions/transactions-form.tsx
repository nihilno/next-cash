"use client";

import { DatePicker } from "@/components/date-picker";
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
import { deleteTransaction } from "@/lib/actions/transactions";
import { newTransactionSchema, newTransactionType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import DeleteBtn from "./delete-btn";

function TransactionForm({
  categories,
  defaultValues,
  mode = "add",
  id,
  serverAction,
}: TransactionFormProps) {
  const { push, replace } = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<newTransactionType>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      transactionType: "Income",
      transactionDate: new Date(),
      description: "",
      ...defaultValues,
    },
  });

  async function onSubmit(formData: newTransactionType) {
    const result = await serverAction(
      formData,
      mode === "edit" ? id : undefined,
    );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    if (!result.transactionDate) {
      toast.error(
        "Incorrect transaction date was specified. Please try again.",
      );
      return;
    }

    toast.success(result.message);
    form.reset();
    replace(
      `/dashboard/transactions?month=${result.transactionDate.getMonth() + 1}&year=${result.transactionDate.getFullYear()}`,
    );
  }

  async function onDelete(id: string | undefined) {
    if (!id) {
      toast.error("Cannot delete transaction: invalid ID.");
      return;
    }

    try {
      setIsDeleting(true);
      const result = await deleteTransaction(id);
      if (result.success) {
        replace("/dashboard/transactions");
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting a transaction.");
    } finally {
      setIsDeleting(false);
    }
  }
  const transactionType = form.watch("transactionType");
  const filteredCategories = categories.filter(
    (prev) => prev.type === transactionType,
  );

  const disabled = form.formState.isSubmitting;

  useEffect(() => {
    const current = form.getValues("categoryId");

    const isValidForType = categories.some(
      (c) => c.id === current && c.type === transactionType,
    );

    if (!isValidForType) {
      form.setValue("categoryId", 0);
      form.clearErrors("categoryId");
    }
  }, [transactionType, categories, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2"
      >
        <fieldset className="space-y-4" disabled={disabled}>
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
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category." />
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
        </fieldset>
        <fieldset className="space-y-4" disabled={disabled}>
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
                    type="number"
                    step={"0.01"}
                    placeholder="0.00"
                    className="text-sm"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="sm:col-span-2" disabled={disabled}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg. Electricity bill."
                    className="text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset
          className="mt-12 grid grid-cols-1 gap-2 sm:col-span-2 sm:grid-cols-2"
          disabled={disabled}
        >
          <Button
            type="submit"
            className="w-full sm:col-span-2"
            disabled={disabled}
          >
            <div className="flex items-center gap-1">
              {disabled && <Loader2Icon className="animate-spin" />}
              <span>{mode === "add" ? "Create Draft" : "Edit Draft"}</span>
            </div>
          </Button>
          {mode === "add" ? (
            <Button
              type="button"
              variant={"outline"}
              className="w-full"
              onClick={() => form.reset()}
            >
              Clear Draft
            </Button>
          ) : (
            <DeleteBtn
              onDelete={onDelete}
              id={id}
              isDeleting={isDeleting}
              disabled={disabled}
            />
          )}
          <Button
            type="button"
            className="w-full"
            variant={"outline"}
            onClick={() => push("/dashboard")}
          >
            Cancel Draft
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}

export default TransactionForm;
