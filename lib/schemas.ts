import { addDays } from "date-fns";
import z from "zod";

const newTransactionSchema = z.object({
  transactionType: z.enum(["Income", "Expense"], "Please, select a type."),
  categoryId: z.string("Please, select a category."),
  transactionDate: z.coerce.date().max(addDays(new Date(), 1)),
  amount: z.coerce
    .number()
    .min(1, "Provide an amount.")
    .positive("Amount must be greater than 0."),
  description: z
    .string()
    .max(300, "Description must contain a maximum od 300 characters.")
    .optional(),
});

type newTransactionType = z.infer<typeof newTransactionSchema>;

export { newTransactionSchema, type newTransactionType };
