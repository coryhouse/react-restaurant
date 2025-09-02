// This file contains reusable Tanstack Query QueryOptions. See here: https://tkdodo.eu/blog/the-query-options-api
import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { type Food, type NewFood, foodSchema } from "../types/food.types";
import ky from "ky";

const baseUrl = "http://localhost:3001/foods";

const keys = {
  allFoods: ["foods"],
};

export class FoodNotFoundError extends Error {}

export const foodQueries = {
  getFoodById: (foodId?: string) =>
    queryOptions({
      queryKey: [...keys.allFoods, foodId],
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
      queryKey: keys.allFoods,
      queryFn: async () => {
        const json = await ky.get(baseUrl).json();
        return foodSchema.array().parse(json);
      },
    }),
};

export const foodMutations = {
  deleteFood: (onSuccess: () => void) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();
    return {
      mutationFn: async (foodId: string) => {
        await ky.delete(`${baseUrl}/${foodId}`);
      },
      onSuccess,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: keys.allFoods });
      },
    };
  },

  saveFood: (onSuccess: () => void) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryClient = useQueryClient();
    return {
      mutationFn: async (food: NewFood | Food) => {
        const body = { json: food };
        return "id" in food
          ? await ky.put(`${baseUrl}/${food.id}`, body).json()
          : await ky.post(baseUrl, body).json();
      },
      onSuccess,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: keys.allFoods });
      },
    };
  },
};
