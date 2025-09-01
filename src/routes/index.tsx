import { useState } from "react";
import { type FoodTag, foodTags } from "../types/food.types";
import { createFileRoute } from "@tanstack/react-router";
import { foodQueries } from "../query-factories/foods";
import { useQuery } from "@tanstack/react-query";
import { FoodCard } from "../shared/FoodCard";
import Spinner from "../shared/Spinner";

export const Route = createFileRoute("/")({
  component: Index,
  errorComponent: () => <div>Oops! Failed to load the menu.</div>,
  pendingComponent: () => <Spinner />,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(foodQueries.getFoods()), // Starts the fetch earlier
});

function Index() {
  const [selectedTag, setSelectedTag] = useState<FoodTag | "">("");
  const [searchText, setSearchText] = useState("");
  const { data: foods, isLoading } = useQuery(foodQueries.getFoods());

  if (isLoading) return <Spinner />;
  if (!foods) return <p>No foods found</p>;

  // Derived state
  const matchingFoods = foods.filter((food) => {
    const matchesTag = selectedTag === "" || food.tags.includes(selectedTag);
    const matchesSearch =
      searchText === "" ||
      food.name.toLowerCase().includes(searchText.toLowerCase()) ||
      food.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Menu</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="tag-filter"
            >
              Filter by category
            </label>
            <select
              id="tag-filter"
              value={selectedTag}
              onChange={(event) =>
                setSelectedTag(event.target.value as FoodTag)
              }
              className="block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All categories</option>
              {foodTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="search-input"
            >
              Search menu
            </label>
            <input
              id="search-input"
              type="search"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
              placeholder="Search by name or description..."
              className="block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {(selectedTag !== "" || searchText !== "") && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="text-blue-700 font-medium">
              {matchingFoods.length} item{matchingFoods.length !== 1 && "s"}{" "}
              found
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {matchingFoods.map((food) => (
          <FoodCard key={food.id} food={food} showActions />
        ))}
      </div>
    </>
  );
}
