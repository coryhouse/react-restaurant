import { useEffect, useState } from "react";
import { Food, FoodTag, foodTags } from "../food";
import { Card } from "../Card";
import { Link } from "@tanstack/react-router";

export const component = function Index() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedTag, setSelectedTag] = useState<FoodTag | "">("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch("http://localhost:300/foods");
        const _foods = (await resp.json()) as Food[];
        setFoods(_foods);
      } catch (error) {
        console.error(error);
        setError(error as Error); // Hack. Real world, inspect the error narrow the type
      }
    }

    fetchData();
  }, []);

  // Derived state
  const matchingFoods =
    selectedTag === ""
      ? foods
      : foods.filter((food) => food.tags.includes(selectedTag));

  if (error) throw error;

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
                  to={"/admin"}
                  search={{ foodId: Number(food.id) }}
                >
                  Edit
                </Link>
                <button
                  aria-label={"Delete " + food.name}
                  className="text-red-500 hover:cursor-pointer"
                  onClick={() => {
                    // Optimistic delete
                    fetch("http://localhost:3001/foods/" + food.id, {
                      method: "DELETE",
                    });
                    setFoods((prevFoods) => {
                      const newFoods = prevFoods.filter((f) => f !== food);
                      console.log(newFoods);
                      return newFoods; // Whatever we return becomes the new state. Setting state is asynchronous (hey react, set the state ASAP)
                    });
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
};
