// This file contains reusable Tanstack Query QueryOptions. See here: https://tkdodo.eu/blog/the-query-options-api
import { queryOptions, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { type Food, foodSchema, type NewFood } from "../types/food.types";

const baseUrl = "http://localhost:3001/foods";

export const foodQueryKeys = {
  allFoods: ["foods"],
  foodById: (foodId: string) => [...foodQueryKeys.allFoods, foodId],
};

export class FoodNotFoundError extends Error {}

export const foodQueries = {
  getFoodById: (foodId?: string) =>
    queryOptions({
      queryKey: foodQueryKeys.foodById(foodId!),
      queryFn: async () => {
        const json = await ky
          .get(`${baseUrl}/${foodId}`)
          .json()
          .catch((error) => {
            if (error.response.status === 404)
              throw new FoodNotFoundError("Food not found");
            throw new Error("Failed to fetch food");
          });
        return foodSchema.parse(json);
      },
    }),

  getFoods: () =>
    queryOptions({
      queryKey: foodQueryKeys.allFoods,
      queryFn: async () => {
        const json = await ky.get(baseUrl).json();
        return foodSchema.array().parse(json);
      },
    }),
};

export const foodMutations = {
  deleteFood: (onSuccess: () => void) => {
    const queryClient = useQueryClient();
    return {
      mutationFn: async (foodId: string) => {
        await ky.delete(`${baseUrl}/${foodId}`);
      },
      onSuccess,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: foodQueryKeys.allFoods });
      },
    };
  },
  saveFood: (onSuccess: () => void) => {
    const queryClient = useQueryClient();
    return {
      mutationFn: async (food: NewFood | Food) => {
        const body = { json: food };
        return "id" in food
          ? foodSchema.parse(await ky.put(`${baseUrl}/${food.id}`, body).json())
          : foodSchema.parse(await ky.post(baseUrl, body).json());
      },
      onSuccess,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: foodQueryKeys.allFoods });
      },
    };
  },
};
