import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { foodQueries } from "../query-factories/foods";
import { FoodCard } from "../shared/FoodCard";
import Spinner from "../shared/Spinner";
import { type FoodTag, foodTags } from "../types/food.types";

const searchSchema = z.object({
  tag: z.enum(foodTags).optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute("/")({
  component: Index,
  errorComponent: () => <div>Oops! Failed to load the menu.</div>,
  pendingComponent: () => <Spinner />,
  validateSearch: searchSchema,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(foodQueries.getFoods()), // Starts the fetch earlier
});

function Index() {
  const { tag, search } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: foods, isLoading } = useQuery(foodQueries.getFoods());

  if (isLoading) return <Spinner />;
  if (!foods) return <p>No foods found</p>;

  // Derived state
  const matchingFoods = foods.filter((food) => {
    const matchesTag = !tag || food.tags.includes(tag);
    const matchesSearch =
      !search ||
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.description.toLowerCase().includes(search.toLowerCase());
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
              value={tag}
              onChange={(event) =>
                navigate({
                  search: (prev) => ({
                    ...prev,
                    tag: (event.target.value as FoodTag) || undefined,
                  }),
                })
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
              value={search || ""}
              onChange={(event) => {
                navigate({
                  search: (prev) => ({
                    ...prev,
                    search: event.target.value || undefined,
                  }),
                });
              }}
              placeholder="Search by name or description..."
              className="block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {(tag || search) && (
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
