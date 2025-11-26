import { createFileRoute, notFound } from "@tanstack/react-router";
import { FoodCard } from "../shared/FoodCard";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { z } from "zod";
import { foodCollection } from "../collections/foodCollection";
import { FoodRatings } from "../shared/FoodRatings";
import Spinner from "../shared/Spinner";
import { ratingCollection } from "../collections/ratingCollection";

export const Route = createFileRoute("/food/$foodId")({
  params: {
    parse: (params) => ({
      foodId: z.string().parse(params.foodId),
    }),
  },
  component: FoodDetail,
  loader: async () => {
    // start fetch ASAP - Minor optimization in this case
    foodCollection.preload();
    ratingCollection.preload();
  },
});

function FoodDetail() {
  const { foodId } = Route.useParams();

  // Fetch food and ratings in parallel
  const { data: foods, isLoading } = useLiveQuery((q) =>
    q
      .from({ food: foodCollection })
      .leftJoin({ rating: ratingCollection }, ({ rating, food }) =>
        eq(rating.foodId, food.id)
      )
      .where(({ food }) => eq(food.id, foodId))
  );

  if (isLoading) return <Spinner />;
  if (foods.length === 0) throw notFound();
  return (
    <>
      <FoodCard food={foods[0].food} />
      <FoodRatings foodId={foods[0].food.id} />
    </>
  );
}
