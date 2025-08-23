// This component is shared between the admin index and admin $foodId routes.
import { useEffect, useState } from "react";
import { type Food, type NewFood, foodTags } from "../food";
import { Input } from "../shared/Input";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ErrorMessage } from "../shared/ErrorMessage";
import { foodMutations, foodQueries } from "../query-factories/foods";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Status } from "../types/status.types";
import { z } from "zod";

export const Route = createFileRoute("/admin/{-$foodId}")({
  params: {
    parse: (params) => ({
      foodId: z.string().optional().parse(params.foodId),
    }),
  },
  component: Admin,
  loader: ({ context: { queryClient }, params: { foodId } }) => {
    if (foodId) queryClient.ensureQueryData(foodQueries.getFoodById(foodId));
  },
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
  const { data: existingFood } = useQuery({
    ...foodQueries.getFoodById(foodId),
    enabled: !!foodId,
  });

  useEffect(
    function populateForm() {
      if (existingFood) setFood(existingFood);
    },
    [existingFood]
  );

  const { mutate: saveFood } = useMutation(
    foodMutations.saveFood(() => {
      toast.success(`Food ${"id" in food ? "saved" : "added"}!`);
      navigate({ to: "/" }); // Redirect to the Menu
    })
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
    saveFood(food);
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    // Functional form / callback form of set state.
    // Useful anytime we want to set state based on existing state.
    // Using the computed property syntax to set a property using a variable.
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
          error={errors.name}
          formStatus={status}
        />

        <Input
          value={food.description}
          id="description"
          onChange={onChange}
          label="Description"
          className="mb-4"
          error={errors.description}
          formStatus={status}
        />

        <Input
          value={food.price}
          id="price"
          type="number"
          onChange={onChange}
          label="Price"
          className="mb-4"
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
