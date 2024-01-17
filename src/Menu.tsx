import { Fragment, useState } from "react";

export function Menu() {
  const [foods, setFoods] = useState(["pizza", "hamburger", "taco"]);

  return (
    <>
      <h1>Menu</h1>
      <ul>
        {foods.map((food) => (
          <Fragment key={food}>
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
            <li key={food}>{food}</li>
          </Fragment>
        ))}
      </ul>
    </>
  );
}
