import { createFileRoute, notFound } from "@tanstack/react-router";
import { Card } from "../shared/Card";
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

  return (
    <div>
      <Card>
        <div className="flex justify-between">
          <div className="w-64">
            <h2 className="text-2xl font-bold mb-4">{food.name}</h2>
            <p className="mb-4">{food.description}</p>
            <p className="text-xl font-bold mb-4">${food.price}</p>
            <div>
              <span className="font-bold">Tags:</span> {food.tags.join(", ")}
            </div>
          </div>
          <div className="w-48">
            <img
              className="w-full rounded"
              alt={food.name}
              src={`/images/${food.image}`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
