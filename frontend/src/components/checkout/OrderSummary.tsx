import { Card } from "../../shared/Card";
import type { CartItem } from "../../types/cart.types";

type OrderSummaryProps = {
  items: CartItem[];
};

export function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <Card className="sticky top-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.food.id} className="flex gap-3">
            <img
              src={`/images/${item.food.image}`}
              alt={item.food.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{item.food.name}</p>
              <p className="text-xs text-gray-600">
                Qty: {item.quantity} × ${item.food.price.toFixed(2)}
              </p>
            </div>
            <p className="font-semibold text-sm">
              ${(item.food.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (8%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
}
