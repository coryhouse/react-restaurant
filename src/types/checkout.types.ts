import { z } from "zod";

export const checkoutFormSchema = z.object({
  customerName: z.string().min(1, { error: "Name is required" }),
  customerEmail: z.email({ error: "Valid email required" }),
  customerPhone: z.string().optional(),
  addressLine1: z.string().min(1, { error: "Address is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { error: "City is required" }),
  state: z
    .string()
    .length(2, { error: "State must be 2 letters" })
    .regex(/^[A-Z]{2}$/, { error: "Use state abbreviation (e.g., NY)" }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { error: "Enter valid ZIP code" }),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;

export type CheckoutResponse = {
  sessionId: string;
  url: string;
  orderId: string;
};
