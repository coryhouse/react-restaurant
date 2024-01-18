import { useState } from "react";
import { NewFood, foodTags } from "../food";
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
          className="mb-4"
        />

        <Input
          value={food.description}
          id="description"
          onChange={(event) =>
            setFood({ ...food, description: event.target.value })
          }
          label="Description"
          className="mb-4"
        />

        <Input
          value={food.price}
          id="price"
          onChange={(event) =>
            setFood({ ...food, price: Number(event.target.value) })
          }
          label="Price"
          className="mb-4"
        />

        <fieldset>
          <legend className="font-bold">Tags</legend>
          <ul>
            {foodTags.map((tag) => (
              <li>
                <input type="checkbox" /> <label>{tag}</label>
              </li>
            ))}
          </ul>
        </fieldset>

        <button className="bg-slate-300 border p-1 rounded mt-4" type="submit">
          Add Food
        </button>
      </form>
    </>
  );
};
