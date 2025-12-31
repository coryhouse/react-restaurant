import { createContext, useContext } from "react";
import type { Food } from "./types/food.types";
import type { CartContext, CartItem } from "./types/cart.types";
import { useLocalStorage } from "./hooks/useLocalStorage";

const CartContext = createContext<CartContext | null>(null);

type CartContextProviderProps = {
  children: React.ReactNode;
};

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [items, setItems] = useLocalStorage<CartItem[]>(
    "react-restaurant-cart",
    []
  );

  // Computed values - React Compiler will memoize these automatically
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.food.price * item.quantity,
    0
  );

  const addItem = (food: Food) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.food.id === food.id);
      if (existing) {
        // Increment quantity if already in cart
        return prev.map((item) =>
          item.food.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item with quantity 1
      return [...prev, { food, quantity: 1 }];
    });
  };

  const removeItem = (foodId: string) => {
    setItems((prev) => prev.filter((item) => item.food.id !== foodId));
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(foodId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.food.id === foodId ? { ...item, quantity } : item
      )
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

export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}
