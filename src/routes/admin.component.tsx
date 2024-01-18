import { useState } from "react";
import { NewFood, foodTags } from "../food";
import { Input } from "../shared/Input";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

type Status = "idle" | "submitted" | "submitting";

const newFood: NewFood = {
  description: "",
  image: "",
  name: "",
  price: 0,
  tags: [],
};

type Errors = {
  description?: string;
  image?: string;
  name?: string;
  price?: string;
  tags?: string;
};

export const component = function Admin() {
  const [food, setFood] = useState(newFood);
  const [status, setStatus] = useState<Status>("idle");

  const navigate = useNavigate();

  const errors = validate();

  function validate() {
    const errors: Errors = {};
    if (!food.name) errors.name = "Name is required";
    if (!food.description) errors.description = "Description is required";
    if (food.tags.length === 0) errors.tags = "Select at least one tag";
    return errors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // prevent the browser from reloading the page.
    if (Object.keys(errors).length > 0) {
      setStatus("submitted");
      return; // If errors, stop here.
    }
    setStatus("submitting");
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

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Functional form / callback form of set state.
    // Useful anytime we want to set state based on existing state.
    setFood((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  }

  return (
    <>
      <h1 className="p-2">Admin</h1>
      <form className="p-2" onSubmit={handleSubmit}>
        <Input
          value={food.name}
          id="name"
          onChange={onChange}
          label="Name"
          className="mb-4"
          error={status === "submitted" ? errors.name : ""}
        />

        <Input
          value={food.description}
          id="description"
          onChange={onChange}
          label="Description"
          className="mb-4"
          error={status === "submitted" ? errors.description : ""}
        />

        <Input
          value={food.price}
          id="price"
          type="number"
          onChange={onChange}
          label="Price"
          className="mb-4"
          error={errors.price}
        />

        <fieldset>
          <legend className="font-bold">Tags</legend>
          {status === "submitted" && errors.tags && (
            <p role="alert" className="text-red-500">
              {errors.tags}
            </p>
          )}
          <ul>
            {foodTags.map((tag) => {
              const id = "tag-" + tag;
              return (
                <li key={tag}>
                  <input
                    id={id}
                    type="checkbox"
                    value={tag}
                    checked={food.tags.some((foodTag) => foodTag === tag)}
                    onChange={(event) => {
                      setFood({
                        ...food,
                        tags: event.target.checked
                          ? [...food.tags, tag]
                          : food.tags.filter((t) => t !== tag),
                      });
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
