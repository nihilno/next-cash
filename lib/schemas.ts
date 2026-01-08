import { addDays } from "date-fns";
import z from "zod";

const newTransactionSchema = z.object({
  transactionType: z.enum(["Income", "Expense"], {
    message: "Please, select a type.",
  }),
  categoryId: z.string({ message: "Please, select a category." }),
  transactionDate: z.coerce
    .date()
    .refine((date) => date <= addDays(new Date(), 1), {
      message: "Transaction date cannot be later than tomorrow.",
    }),
  amount: z.coerce
    .number({ message: "Please, provide an amount" })
    .min(1, "Please, provide an amount")
    .positive("Amount must be greater than 0."),
  description: z
    .string()
    .max(300, {
      message: "Description must contain a maximum of 300 characters.",
    })
    .optional()
    .transform((val) => val?.trim() || undefined),
});

type newTransactionType = z.infer<typeof newTransactionSchema>;

export { newTransactionSchema, type newTransactionType };
