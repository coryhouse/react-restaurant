import { Fragment, useEffect, useState } from "react";
import { Food } from "./food";

export function Menu() {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("http://localhost:3001/foods");
      const _foods = (await resp.json()) as Food[];
      setFoods(_foods);
    }

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">Menu</h1>
      <img src="/images/burger.jpg" />
      <ul>
        {foods.map((food) => (
          <Fragment key={food.id}>
            <button
              onClick={() => {
                setFoods((prevFoods) => {
                  const newFoods = prevFoods.filter((f) => f !== food);
                  console.log(newFoods);
                  return newFoods; // Whatever we return becomes the new state. Setting state is asynchronous (hey react, set the state ASAP)
                });
              }}
            >
              Delete
            </button>{" "}
            <li>{food.name}</li>
          </Fragment>
        ))}
      </ul>
    </>
  );
}
