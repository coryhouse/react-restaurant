// This component is shared between the admin index and admin $foodId routes.
import { useEffect, useState } from "react";
import { type Food, type NewFood, foodTags } from "../types/food.types";
import { Input } from "../shared/Input";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ErrorMessage } from "../shared/ErrorMessage";
import { foodMutations, foodQueries } from "../query-factories/foods";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Status } from "../types/status.types";
import { z } from "zod";
import Spinner from "../shared/Spinner";

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
  const { data: existingFood, isLoading } = useQuery({
    ...foodQueries.getFoodById(foodId),
    enabled: !!foodId,
  });

  useEffect(
    function populateForm() {
      if (existingFood) {
        setFood(existingFood);
      } else if (!foodId) {
        setFood(newFood);
      }
    },
    [existingFood, foodId]
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
    if (status === "submitting") return; // Prevent multiple submissions.
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
    const value =
      event.target.id === "price"
        ? Number(event.target.value)
        : event.target.value;
    setFood((prev) => ({ ...prev, [event.target.id]: value }));
  }

  if (isLoading) return <Spinner />;
  if (foodId && !food) throw notFound(); //tanstack.com/router/latest/docs/framework/react/guide/not-found-errors#throwing-your-own-notfound-errors

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {foodId ? "Edit Food" : "Add New Food"}
          </h1>
          <p className="text-gray-600 mt-1">
            {foodId
              ? "Update the details below to modify this food."
              : "Fill in the details below to add a new item to the menu."}
          </p>
        </div>

        <form className="px-6 py-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              value={food.name}
              id="name"
              onChange={onChange}
              label="Name"
              error={errors.name}
              formStatus={status}
            />

            <Input
              value={food.price}
              id="price"
              type="number"
              step="0.01"
              min="0"
              onChange={onChange}
              label="Price ($)"
              error={errors.price}
              formStatus={status}
            />
          </div>

          <Input
            value={food.description}
            id="description"
            onChange={onChange}
            label="Description"
            error={errors.description}
            formStatus={status}
          />

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-gray-700">Tags</legend>
            {status === "submitted" && <ErrorMessage message={errors.tags} />}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {foodTags.map((tag) => {
                const id = "tag-" + tag;
                return (
                  <label
                    key={tag}
                    htmlFor={id}
                    className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                      food.tags.some((foodTag) => foodTag === tag)
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{tag}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="submit"
              aria-disabled={status === "submitting"}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {status === "submitting" ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" center={false} />
                </div>
              ) : foodId ? (
                "Save Changes"
              ) : (
                "Add Food"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
