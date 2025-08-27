import { createFileRoute, notFound } from "@tanstack/react-router";
import { FoodCard } from "../shared/FoodCard";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { z } from "zod";
import { foodCollection } from "../collections/foodCollection";

export const Route = createFileRoute("/food/$foodId")({
  params: {
    parse: (params) => ({
      foodId: z.string().parse(params.foodId),
    }),
  },
  component: FoodDetail,
  notFoundComponent: () => <h1>Food not found</h1>,
});

function FoodDetail() {
  const { foodId } = Route.useParams();

  const { data: foods, isLoading } = useLiveQuery((q) =>
    q.from({ food: foodCollection }).where(({ food }) => eq(food.id, foodId))
  );

  if (isLoading) return <p>Loading...</p>;

  const food = foods.length > 0 ? foods[0] : null;

  if (!food) {
    throw notFound();
  }

  return <FoodCard food={food} />;
}
