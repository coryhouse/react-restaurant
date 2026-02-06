import { queryOptions, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import type { CartItem } from "../types/cart.types";
import type {
  CheckoutFormData,
  CheckoutResponse,
} from "../types/checkout.types";
import { orderSchema } from "../types/order.types";

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const orderQueryKeys = {
  allOrders: ["orders"],
  orderById: (orderId: string) => [...orderQueryKeys.allOrders, orderId],
};

export const orderQueries = {
  getOrderById: (orderId?: string) =>
    queryOptions({
      queryKey: orderQueryKeys.orderById(orderId ?? ""),
      queryFn: async () => {
        const json = await ky.get(`${baseUrl}/orders/${orderId}`).json();
        return orderSchema.parse(json);
      },
      enabled: !!orderId,
    }),
};

export const orderMutations = {
  createCheckout: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();

    return {
      mutationFn: async (payload: CheckoutFormData & { items: CartItem[] }) => {
        const response = await ky
          .post(`${baseUrl}/checkout`, {
            json: {
              ...payload,
              items: payload.items.map((item) => ({
                foodId: item.food.id,
                foodName: item.food.name,
                foodImage: item.food.image,
                price: item.food.price,
                quantity: item.quantity,
              })),
            },
          })
          .json<CheckoutResponse>();

        return response;
      },
      onSuccess: (data: CheckoutResponse) => {
        // Prefetch order for success page
        queryClient.prefetchQuery(orderQueries.getOrderById(data.orderId));
      },
    };
  },
};
