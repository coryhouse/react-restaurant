// This file contains reusable Tanstack Query QueryOptions. See here: https://tkdodo.eu/blog/the-query-options-api
import { queryOptions } from "@tanstack/react-query";
import ky from "ky";
import { ratingSchema } from "../types/rating.types";

const baseUrl = import.meta.env.VITE_API_URL + "/ratings";

const keys = {
  allRatings: ["ratings"],
};

export class RatingNotFoundError extends Error {}

export const ratingQueries = {
  getRatingsByFoodId: (foodId?: number) =>
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
        return ratingSchema.array().parse(json);
      },
    }),
};
