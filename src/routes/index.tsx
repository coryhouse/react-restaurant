import { useState } from "react";
import { type FoodTag, foodTags } from "../food";
import { Card } from "../Card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLiveQuery } from "@tanstack/react-db";
import { toast } from "sonner";
import { foodCollection } from "../main";

export const Route = createFileRoute("/")({
  component: Index,
  errorComponent: () => <div>Oops! Failed to load the menu.</div>,
});

function Index() {
  const [selectedTag, setSelectedTag] = useState<FoodTag | "">("");

  const { data: foods, isLoading } = useLiveQuery(foodCollection);

  if (isLoading) return <p>Loading...</p>;

  // Derived state
  const matchingFoods =
    selectedTag === ""
      ? foods
      : foods.filter((food) => food.tags.includes(selectedTag));

  return (
    <>
      <h1>Menu</h1>

      <label className="block font-bold" htmlFor="tag-filter">
        Filter by tag
      </label>
      <select
        id="tag-filter"
        value={selectedTag}
        onChange={(event) => setSelectedTag(event.target.value as FoodTag)}
      >
        <option value="">All</option>
        {foodTags.map((tag) => (
          <option key={tag}>{tag}</option>
        ))}
      </select>

      {selectedTag !== "" && (
        <h2>
          {matchingFoods.length} matching food{matchingFoods.length > 1 && "s"}{" "}
          found:
        </h2>
      )}
      <div className="flex flex-wrap">
        {matchingFoods.map((food) => (
          <Card key={food.id}>
            <div className="flex justify-between">
              <div className="w-48">
                <h2>{food.name}</h2>
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
                <p>{food.description}</p>
                <p>${food.price}</p>
                <p>
                  <span className="font-bold">Tags</span>:{" "}
                  {food.tags.join(", ")}
                </p>
              </div>
              <div className="w-36">
                <img
                  className="w-32 rounded"
                  alt={food.name}
                  src={`/images/${food.image}`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
