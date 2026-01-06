import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { useCart } from "../hooks/useCart";
import { Card } from "../shared/Card";
import { LinkButton } from "../shared/LinkButton";

const searchSchema = z.object({
  session_id: z.string(),
});

export const Route = createFileRoute("/checkout/success")({
  validateSearch: searchSchema,
  component: CheckoutSuccess,
});

function CheckoutSuccess() {
  const { session_id } = Route.useSearch();
  const { clearCart } = useCart();

  // Clear cart once on mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mb-2">
          Thank you for your order. We've sent a confirmation email with your
          order details.
        </p>

        <p className="text-sm text-gray-500">Session ID: {session_id}</p>
      </div>

      <Card className="text-left mb-6">
        <h2 className="text-xl font-semibold mb-2">What's Next?</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="mr-2">📧</span>
            Check your email for the receipt
          </li>
          <li className="flex items-start">
            <span className="mr-2">🍳</span>
            Our kitchen will start preparing your order
          </li>
          <li className="flex items-start">
            <span className="mr-2">🚚</span>
            Expect delivery within 45-60 minutes
          </li>
        </ul>
      </Card>

      <div className="flex gap-4 justify-center">
        <LinkButton to="/" size="lg">
          Back to Menu
        </LinkButton>
      </div>
    </div>
  );
}
