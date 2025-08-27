import { useState } from "react";
import { type FoodTag, foodTags } from "../types/food.types";
import { FoodCard } from "../shared/FoodCard";
import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "@tanstack/react-db";
import { foodCollection } from "../collections/foodCollection";

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
          <FoodCard key={food.id} food={food} showActions={true} />
        ))}
      </div>
    </>
  );
}
