// This component is shared between the admin index and admin $foodId routes.
import { useEffect, useState } from "react";
import { type Food, type NewFood, foodTags } from "../types/food.types";
import { Input } from "../shared/Input";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ErrorMessage } from "../shared/ErrorMessage";
import { eq, useLiveQuery } from "@tanstack/react-db";
import type { Status } from "../types/status.types";
import { z } from "zod";
import { toast } from "sonner";
import { foodCollection } from "../collections/foodCollection";

export const Route = createFileRoute("/admin/{-$foodId}")({
  params: {
    parse: (params) => ({
      foodId: z.string().optional().parse(params.foodId),
    }),
  },
  component: Admin,
  notFoundComponent: () => <h1>Food not found</h1>,
});

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

function Admin() {
  const [food, setFood] = useState<Food | NewFood>(newFood);
  const [status, setStatus] = useState<Status>("idle");
  const navigate = useNavigate();
  const { foodId } = Route.useParams();

  const { data: existingFood } = useLiveQuery((q) =>
    q.from({ food: foodCollection }).where(({ food }) => eq(food.id, foodId))
  );

  const foundFood = !!foodId && existingFood.length === 1;

  if (foodId && !foundFood) {
    throw notFound(); //tanstack.com/router/latest/docs/framework/react/guide/not-found-errors#throwing-your-own-notfound-errors
  }

  useEffect(
    function populateForm() {
      if (foundFood && existingFood.length === 1) {
        setFood(existingFood[0]);
      } else if (!foodId) {
        setFood(newFood);
      }
    },
    [foundFood, foodId, existingFood]
  );

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
    try {
      if ("id" in food) {
        // Instantly applies optimistic state, then syncs to server
        foodCollection.update(food.id, (draft) => {
          // set all properties on draft to match food
          Object.assign(draft, food);
        });
        toast.success("Food updated!");
      } else {
        foodCollection.insert({ ...food, id: crypto.randomUUID() }); // add temporary client-side id
        toast.success("Food added!");
      }
      navigate({ to: "/" }); // Redirect to the Menu
    } catch {
      setStatus("idle");
    }
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Functional form / callback form of set state.
    // Useful anytime we want to set state based on existing state.
    // Using the computed property syntax to set a property using a variable.
    const value =
      event.target.id === "price"
        ? Number(event.target.value)
        : event.target.value;
    setFood((prev) => ({ ...prev, [event.target.id]: value }));
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
          error={errors.name}
          formStatus={status}
        />

        <Input
          value={food.description}
          id="description"
          onChange={onChange}
          label="Description"
          error={errors.description}
          formStatus={status}
        />

        <Input
          value={food.price}
          id="price"
          type="number"
          onChange={onChange}
          label="Price"
          error={errors.price}
          formStatus={status}
        />

        <fieldset>
          <legend className="font-bold">Tags</legend>
          {status === "submitted" && <ErrorMessage message={errors.tags} />}
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

        <button className="p-1 mt-4 border rounded bg-slate-300" type="submit">
          {foodId ? "Save" : "Add"} Food
        </button>
      </form>
    </>
  );
}
