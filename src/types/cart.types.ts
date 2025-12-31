import type { Food } from "./food.types";

export type CartItem = {
  food: Food;
  quantity: number;
};

export type CartContext = {
  items: CartItem[];
  addItem: (food: Food) => void;
  removeItem: (foodId: string) => void;
  updateQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};
