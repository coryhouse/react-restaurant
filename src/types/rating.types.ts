import { z } from "zod";

export const ratingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  foodId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export type Rating = z.infer<typeof ratingSchema>;
