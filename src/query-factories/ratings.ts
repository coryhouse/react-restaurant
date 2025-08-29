// This file contains reusable Tanstack Query QueryOptions. See here: https://tkdodo.eu/blog/the-query-options-api
import { queryOptions } from "@tanstack/react-query";
import ky from "ky";
import { ratingSchema } from "../types/rating.types";

const baseUrl = "http://localhost:3001/ratings";

const keys = {
  allRatings: ["ratings"],
};

export class RatingNotFoundError extends Error {}

export const foodQueries = {
  getRatingsByFoodId: (foodId?: string) =>
    queryOptions({
      queryKey: [...keys.allRatings, foodId],
      queryFn: async () => {
        const json = await ky
          .get(`${baseUrl}?foodId=${foodId}`)
          .json()
          .catch((error) => {
            if (error.response.status === 404)
              throw new RatingNotFoundError("Rating not found");
            throw new Error("Failed to fetch rating");
          });
        return ratingSchema.parse(json);
      },
    }),
};
