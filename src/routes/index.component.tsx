import { useEffect, useState } from "react";
import { Food } from "../food";
import { Card } from "../Card";

export const component = function Index() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("http://localhost:3001/foods");
      const _foods = (await resp.json()) as Food[];
      setFoods(_foods);
    }

    fetchData();
  }, []);

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
      <div className="flex flex-wrap">
        {matchingFoods.map((food) => (
          <Card key={food.id}>
            <div className="flex justify-between">
              <div className="w-48">
                <h2>{food.name}</h2>
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
