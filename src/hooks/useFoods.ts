import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NewFood, foodSchema } from "../food";

const baseUrl = "http://localhost:3001/foods";

const keys = {
  allFoods: ["foods"],
};

export function useFoods() {
  return useQuery({
    queryKey: keys.allFoods,
    queryFn: async () => {
      const resp = await fetch(baseUrl);
      const json = await resp.json();
      // If the json doesn't match the schema, then this will throw an error
      const foods = foodSchema.parse(json);
      return foods;
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
