import express from "express";
import Stripe from "stripe";
import { updateOrderPaymentStatus } from "../services/order.service.js";
import { sendReceiptEmail } from "../services/email.service.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// CRITICAL: Webhook route MUST use express.raw() for signature verification
router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;

    if (!sig) {
      return res.status(400).send("Missing stripe-signature header");
    }

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );

      console.log("Webhook event received:", event.type);

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;

          if (!session.metadata?.orderId) {
            console.error("No orderId in session metadata");
            return res.status(400).send("Missing orderId in metadata");
          }

          // Update order status to PAID
          const order = await updateOrderPaymentStatus(
            session.metadata.orderId,
            "PAID",
            session.payment_intent as string,
          );

          console.log("Order updated to PAID:", order.id);

          // Send receipt email
          try {
            await sendReceiptEmail(order);
            console.log("Receipt email sent to:", order.customerEmail);
          } catch (emailError) {
            // Don't fail the webhook if email fails
            console.error("Failed to send receipt email:", emailError);
          }

          break;
        }

        case "checkout.session.expired": {
          const session = event.data.object as Stripe.Checkout.Session;

          if (session.metadata?.orderId) {
            await updateOrderPaymentStatus(
              session.metadata.orderId,
              "CANCELLED",
            );
            console.log(
              "Order cancelled (session expired):",
              session.metadata.orderId,
            );
          }
          break;
        }

        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;

          // Find order by payment intent ID and mark as failed
          // Note: We'd need to store the payment intent ID earlier to do this lookup
          console.log("Payment failed:", paymentIntent.id);
          break;
        }

        default:
          console.log("Unhandled event type:", event.type);
      }

      res.json({ received: true });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Webhook error:", errorMessage);
      res.status(400).send(`Webhook Error: ${errorMessage}`);
    }
  },
);

export default router;
