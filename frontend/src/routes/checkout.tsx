import { createFileRoute } from "@tanstack/react-router";
import { CheckoutForm } from "../components/checkout/CheckoutForm";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { useCart } from "../hooks/useCart";
import { Card } from "../shared/Card";
import { LinkButton } from "../shared/LinkButton";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const { items } = useCart();

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-600 mb-6">
          Add some items to your cart before checking out.
        </p>
        <LinkButton to="/" size="lg">
          Browse Menu
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main checkout form - 2/3 width */}
        <div className="lg:col-span-2">
          <Card>
            <CheckoutForm items={items} />
          </Card>
        </div>

        {/* Order summary sidebar - 1/3 width */}
        <div className="lg:col-span-1">
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}
