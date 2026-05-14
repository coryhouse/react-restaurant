// This file contains reusable Tanstack Query QueryOptions. See here: https://tkdodo.eu/blog/the-query-options-api
import { queryOptions } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";
import { ratingSchema } from "../types/rating.types";

const baseUrl = import.meta.env.VITE_API_URL + "/ratings";

const keys = {
  allRatings: ["ratings"],
};

export const ratingQueries = {
  getRatingsByFoodId: (foodId?: number) =>
    queryOptions({
      queryKey: [...keys.allRatings, foodId],
      queryFn: async () => {
        try {
          const json = await ky.get(`${baseUrl}?foodId=${foodId}`).json();
          return ratingSchema.array().parse(json);
        } catch (error) {
          if (error instanceof HTTPError && error.response.status === 404) {
            return [];
          }
          throw error;
        }
      },
    }),
};
