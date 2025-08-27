import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Food } from "../types/food.types";
import { foodCollection } from "../collections/foodCollection";
import { Card } from "./Card";

type FoodCardProps = {
  food: Food;
  showActions?: boolean;
};

export function FoodCard({ food, showActions = false }: FoodCardProps) {
  return (
    <Card>
      <div className="flex justify-between">
        <div className={showActions ? "w-48" : ""}>
          <h2 className={showActions ? "text-base" : "text-2xl font-bold mb-4"}>
            {showActions ? (
              <Link to="/food/$foodId" params={{ foodId: food.id }}>
                {food.name}
              </Link>
            ) : (
              food.name
            )}
          </h2>
          {showActions && (
            <div className="mb-2">
              <Link
                className="px-2 py-1 mr-2 text-white bg-blue-600 rounded"
                to="/admin/{-$foodId}"
                params={{ foodId: food.id }}
              >
                Edit
              </Link>
              <button
                aria-label={"Delete " + food.name}
                className="text-red-500 hover:cursor-pointer"
                onClick={() => {
                  foodCollection.delete(food.id);
                  toast.success("Food deleted");
                }}
              >
                Delete
              </button>
            </div>
          )}
          <p className="mb-4">{food.description}</p>
          <p className={showActions ? "text-base" : "text-xl font-bold mb-4"}>
            ${food.price}
          </p>
          <div>
            <span className="font-bold">Tags:</span> {food.tags.join(", ")}
          </div>
        </div>
        <div className={"ml-2 " + (showActions ? "w-36" : "w-80")}>
          <img
            className="w-full rounded"
            alt={food.name}
            src={`/images/${food.image}`}
          />
        </div>
      </div>
    </Card>
  );
}
