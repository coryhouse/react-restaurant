import { createFileRoute, notFound } from "@tanstack/react-router";
import { FoodCard } from "../shared/FoodCard";
import { FoodRatings } from "../shared/FoodRatings";
import { z } from "zod";
import { foodQueries } from "../query-factories/foods";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../shared/Spinner";
import { ratingQueries } from "../query-factories/ratings";

export const Route = createFileRoute("/food/$foodId")({
  params: {
    parse: (params) => ({
      foodId: z.string().parse(params.foodId),
    }),
  },
  component: FoodDetail,
  loader: ({ context: { queryClient }, params: { foodId } }) => {
    if (foodId) {
      queryClient.ensureQueryData(foodQueries.getFoodById(foodId));
      queryClient.ensureQueryData(ratingQueries.getRatingsByFoodId(foodId));
    }
  },
});

function FoodDetail() {
  const { foodId } = Route.useParams();

  const { data: existingFood, isLoading } = useQuery({
    ...foodQueries.getFoodById(foodId),
    enabled: !!foodId,
  });

  if (isLoading) return <Spinner />;
  if (!existingFood) throw notFound();

  return (
    <div>
      <FoodCard food={existingFood} />
      <FoodRatings foodId={existingFood.id} />
    </div>
  );
}
