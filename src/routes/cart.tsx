import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "../hooks/useCart";
import { Card } from "../shared/Card";
import { Button } from "../shared/Button";
import { LinkButton } from "../shared/LinkButton";
import type { CartItem } from "../types/cart.types";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <LinkButton to="/" size="lg">
          Browse Menu
        </LinkButton>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Your Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})
        </h1>
        <Button onClick={clearCart} variant="danger-ghost">
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {items.map((item) => (
          <CartItemCard
            key={item.food.id}
            item={item}
            onRemove={removeItem}
            onUpdateQuantity={updateQuantity}
          />
        ))}
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold text-green-600">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <LinkButton to="/checkout" className="w-full font-bold" size="lg">
          Proceed to Checkout
        </LinkButton>
      </Card>
    </div>
  );
}

type CartItemCardProps = {
  item: CartItem;
  onRemove: (foodId: string) => void;
  onUpdateQuantity: (foodId: string, quantity: number) => void;
};

function CartItemCard({ item, onRemove, onUpdateQuantity }: CartItemCardProps) {
  const { food, quantity } = item;

  return (
    <Card>
      <div className="flex gap-4">
        <img
          src={`/images/${food.image}`}
          alt={food.name}
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <LinkButton
                to="/food/$foodId"
                params={{ foodId: food.id }}
                variant="text"
                className="text-lg font-semibold"
              >
                {food.name}
              </LinkButton>
              <p className="text-gray-600 text-sm">
                ${food.price.toFixed(2)} each
              </p>
            </div>
            <Button
              onClick={() => onRemove(food.id)}
              variant="danger-ghost"
              size="sm"
              className="text-sm px-0 py-0"
              aria-label={`Remove ${food.name} from cart`}
            >
              Remove
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onUpdateQuantity(food.id, quantity - 1)}
                variant="ghost"
                className="w-8 h-8 flex items-center justify-center px-0 py-0"
                aria-label="Decrease quantity"
              >
                -
              </Button>
              <span className="font-medium w-8 text-center">{quantity}</span>
              <Button
                onClick={() => onUpdateQuantity(food.id, quantity + 1)}
                variant="ghost"
                className="w-8 h-8 flex items-center justify-center px-0 py-0"
                aria-label="Increase quantity"
              >
                +
              </Button>
            </div>

            <span className="font-bold text-lg text-green-600">
              ${(food.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
