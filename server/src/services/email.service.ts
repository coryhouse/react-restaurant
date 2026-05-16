import { Resend } from "resend";
import { ReceiptEmail } from "../templates/receipt-email.js";
import type { Order, OrderItem } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReceiptEmail(order: Order & { items: OrderItem[] }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "React Bistro <onboarding@resend.dev>", // Use sandbox for testing
      to: order.customerEmail,
      subject: `Order Confirmation - ${order.orderNumber}`,
      react: ReceiptEmail({ order }),
    });

    if (error) {
      console.error("Email send error:", error);
      throw new Error("Failed to send receipt email");
    }

    console.log("Receipt sent:", data?.id);
    return data;
  } catch (error) {
    console.error("Email service error:", error);
    // Don't fail the order if email fails
    throw error;
  }
}
