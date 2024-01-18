import { useState } from "react";
import { NewFood } from "../food";
import { Input } from "../Input";

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
        <Input
          value={food.name}
          id="name"
          onChange={(event) => setFood({ ...food, name: event.target.value })}
          label="Name"
        />

        <Input
          value={food.description}
          id="description"
          onChange={(event) =>
            setFood({ ...food, description: event.target.value })
          }
          label="Description"
        />
      </form>
    </>
  );
};
