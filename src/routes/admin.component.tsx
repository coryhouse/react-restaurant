import { useState } from "react";
import { NewFood, foodTags } from "../food";
import { Input } from "../Input";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const newFood: NewFood = {
  description: "",
  image: "",
  name: "",
  price: 0,
  tags: [],
};

export const component = function Admin() {
  const [food, setFood] = useState(newFood);

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent the browser from reloading the page.
    await fetch("http://localhost:3001/foods", {
      method: "POST",
      body: JSON.stringify(food),
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Food added!");
    navigate({ to: "/" }); // Redirect to the Menu
  }

  return (
    <>
      <h1 className="p-2">Admin</h1>
      <form className="p-2" onSubmit={handleSubmit}>
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
            {foodTags.map((tag) => {
              const id = "tag-" + tag;
              return (
                <li>
                  <input
                    id={id}
                    type="checkbox"
                    value={tag}
                    checked={food.tags.some((foodTag) => foodTag === tag)}
                    onChange={(event) => {
                      const { checked } = event.target;
                      if (checked) {
                        setFood({ ...food, tags: [...food.tags, tag] });
                      } else {
                        setFood({
                          ...food,
                          tags: food.tags.filter((t) => t !== tag),
                        });
                      }
                    }}
                  />{" "}
                  <label htmlFor={id}>{tag}</label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <button className="bg-slate-300 border p-1 rounded mt-4" type="submit">
          Add Food
        </button>
      </form>
    </>
  );
};
