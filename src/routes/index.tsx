import { useState, useDeferredValue } from "react";
import { type FoodTag, foodTags } from "../types/food.types";
import { VirtualizedFoodList } from "../shared/VirtualizedFoodList";
import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "@tanstack/react-db";
import { foodCollection } from "../collections/foodCollection";

export const Route = createFileRoute("/")({
  component: Index,
  errorComponent: () => <div>Oops! Failed to load the menu.</div>,
});

function Index() {
  const [selectedTag, setSelectedTag] = useState<FoodTag | "">("");
  const [searchText, setSearchText] = useState("");
  const deferredSearchText = useDeferredValue(searchText);

  const { data: foods, isLoading } = useLiveQuery(foodCollection);

  if (isLoading) return <p>Loading...</p>;

  // Derived state
  const matchingFoods = foods.filter((food) => {
    const matchesTag = selectedTag === "" || food.tags.includes(selectedTag);
    const matchesSearch =
      deferredSearchText === "" ||
      food.name.toLowerCase().includes(deferredSearchText.toLowerCase()) ||
      food.description.toLowerCase().includes(deferredSearchText.toLowerCase());
    return matchesTag && matchesSearch;
  });

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

      <label className="block font-bold mt-4" htmlFor="search-input">
        Search foods
      </label>
      <input
        id="search-input"
        type="text"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
        placeholder="Search by name or description..."
        className="block w-full p-2 border border-gray-300 rounded"
      />

      {(selectedTag !== "" || deferredSearchText !== "") && (
        <h2 className="mt-2">
          {matchingFoods.length} matching food{matchingFoods.length > 1 && "s"}{" "}
          found:
        </h2>
      )}

      <VirtualizedFoodList
        foods={matchingFoods}
        showActions={true}
        isPending={searchText !== deferredSearchText}
      />
    </>
  );
}
