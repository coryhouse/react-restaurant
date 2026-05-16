import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

type CheckoutSessionParams = {
  orderId: string;
  customerEmail: string;
  items: Array<{
    foodId: string;
    foodName: string;
    foodImage: string;
    price: number;
    quantity: number;
  }>;
  total: number;
};

export async function createCheckoutSession(params: CheckoutSessionParams) {
  const { orderId, customerEmail, items } = params;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.foodName,
          images: [`${frontendUrl}/images/${item.foodImage}`],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${frontendUrl}/checkout/cancel`,
    metadata: {
      orderId, // Critical: Link session to order
    },
  });

  return session;
}

export async function retrieveSession(sessionId: string) {
  return await stripe.checkout.sessions.retrieve(sessionId);
}
