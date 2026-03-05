import { z } from "zod";

export const invoiceItemSchema = z.object({
  title: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  // Use coerce to handle string inputs from HTML forms
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0, "Price cannot be negative"),
  taxPercent: z.coerce.number().min(0).max(100).default(0),
  discountPercent: z.coerce.number().min(0).max(100).default(0),
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

export const invoiceSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().optional().or(z.literal("")), // Allows empty string
  companyName: z.string().optional().or(z.literal("")),
  gstNumber: z.string().optional().or(z.literal("")),
  billingAddress: z.string().min(1, "Billing address is required"),
  country: z.string().min(1, "Country is required"),
  currency: z.string().default("USD"),

  invoiceDate: z.coerce
  .date()
  .refine((date) => !isNaN(date.getTime()), {
    message: "Invoice date is required",
  }),

dueDate: z.coerce
  .date()
  .refine((date) => !isNaN(date.getTime()), {
    message: "Due date is required",
  }),
 paymentTerms: z
  .enum(["Net 7", "Net 15", "Net 30"])
  .refine((val) => !!val, {
    message: "Please select payment terms",
  }),
  
  notes: z.string().optional(),
  terms: z.string().optional(),

  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
}).refine((data) => data.dueDate >= data.invoiceDate, {
  message: "Due date cannot be before the invoice date",
  path: ["dueDate"], // Error will appear on the dueDate field
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;