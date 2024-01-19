import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Food, NewFood } from "../food";

const baseUrl = "http://localhost:3001/foods";

const keys = {
  allFoods: ["foods"],
};

export function useFoods() {
  return useQuery({
    queryKey: keys.allFoods,
    queryFn: async () => {
      const resp = await fetch(baseUrl);
      return (await resp.json()) as Food[];
    },
  });
}

export function useDeleteFood(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (foodId: number) => {
      fetch(baseUrl + "/" + foodId, {
        method: "DELETE",
      });
    },
    onSuccess,
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: keys.allFoods });
    },
  });
}

export function useAddFood(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (food: NewFood) => {
      return fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(food),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess,
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: keys.allFoods });
    },
  });
}
