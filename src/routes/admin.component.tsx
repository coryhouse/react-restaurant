import { useState } from "react";
import { NewFood } from "../food";

const newFood: NewFood = {
  description: "",
  image: "",
  name: "",
  price: 0,
  tags: [],
};

export const component = function Admin() {
  const [food, setFood] = useState(newFood);

  return (
    <>
      <h1 className="p-2">Admin</h1>
      <form className="p-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="border-2 border-gray-400"
          value={food.name}
          onChange={(event) => setFood({ ...food, name: event.target.value })}
        />
      </form>
    </>
  );
};
