import express from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { createCheckoutSession } from "../services/stripe.service.js";
import { createOrder } from "../services/order.service.js";

const prisma = new PrismaClient();

const router = express.Router();

const checkoutSchema = z.object({
  customerName: z.string().min(1),
  customerEmail: z.email(),
  customerPhone: z.string().optional(),
  addressLine1: z.string().min(1),
  addressLine2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  items: z
    .array(
      z.object({
        foodId: z.string(),
        foodName: z.string(),
        foodImage: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
});

router.post("/", async (req, res) => {
  try {
    const data = checkoutSchema.parse(req.body);

    // Calculate totals
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    // Create order in database (PENDING status)
    const order = await createOrder({
      ...data,
      subtotal,
      tax,
      total,
      paymentStatus: "PENDING",
    });

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      orderId: order.id,
      customerEmail: data.customerEmail,
      items: data.items,
      total,
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    res.json({
      sessionId: session.id,
      url: session.url,
      orderId: order.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Invalid checkout data", details: error.issues });
    }
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Checkout failed" });
  }
});

export default router;
