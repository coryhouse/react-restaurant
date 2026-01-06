import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.string(),
  foodId: z.string(),
  foodName: z.string(),
  foodImage: z.string(),
  price: z.number(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  customerName: z.string(),
  customerEmail: z.email(),
  customerPhone: z.string().optional(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  items: z.array(orderItemSchema),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED", "CANCELLED"]),
  paymentMethod: z.string().optional(),
  createdAt: z.iso.datetime(),
});

export type Order = z.infer<typeof orderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
