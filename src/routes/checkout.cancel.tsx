import { createFileRoute } from "@tanstack/react-router";
import { LinkButton } from "../shared/LinkButton";

export const Route = createFileRoute("/checkout/cancel")({
  component: CheckoutCancel,
});

function CheckoutCancel() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="mb-8">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Checkout Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was cancelled. Your cart items are still saved.
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <LinkButton to="/cart" variant="primary" size="lg">
          Back to Cart
        </LinkButton>
        <LinkButton to="/" variant="ghost" size="lg">
          Continue Shopping
        </LinkButton>
      </div>
    </div>
  );
}
