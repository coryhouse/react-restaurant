import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Food, type NewFood, foodSchema } from "../food";
import ky from "ky";

const baseUrl = "http://localhost:3001/foods";

const keys = {
  allFoods: ["foods"],
};

export function useGetFoodById(foodId?: string) {
  return useQuery({
    enabled: Boolean(foodId),
    queryKey: [...keys.allFoods, foodId],
    queryFn: async () => {
      const json = await ky.get(`${baseUrl}/${foodId}`).json();
      return foodSchema.parse(json);
    },
  });
}

export function useFoods() {
  return useQuery({
    queryKey: keys.allFoods,
    queryFn: async () => {
      const json = await ky.get(baseUrl).json();
      return foodSchema.array().parse(json);
    },
  });
}

export function useDeleteFood(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (foodId: string) => {
      ky.delete(`${baseUrl}/${foodId}`);
    },
    onSuccess,
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: keys.allFoods });
    },
  });
}

export function useSaveFood(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (food: NewFood | Food) => {
      const body = { json: food };
      return "id" in food
        ? ky.put(`${baseUrl}/${food.id}`, body).json()
        : ky.post(baseUrl, body).json();
    },
    onSuccess,
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: keys.allFoods });
    },
  });
}
