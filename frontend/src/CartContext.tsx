import { createContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type {
  CartContext as CartContextType,
  CartItem,
} from "./types/cart.types";
import type { Food } from "./types/food.types";

export const CartContext = createContext<CartContextType | null>(null);

type CartContextProviderProps = {
  children: React.ReactNode;
};

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [items, setItems] = useLocalStorage<CartItem[]>(
    "react-restaurant-cart",
    [],
  );

  // Computed values - React Compiler will memoize these automatically
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0,
  );

  const addItem = (food: Food) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.food.id === food.id);
      if (existing) {
        // Increment quantity if already in cart
        return prev.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      // Add new item with quantity 1
      return [...prev, { food, quantity: 1 }];
    });
  };

  const removeItem = (foodId: number) => {
    setItems((prev) => prev.filter((item) => item.food.id !== foodId));
  };

  const updateQuantity = (foodId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(foodId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.food.id === foodId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
