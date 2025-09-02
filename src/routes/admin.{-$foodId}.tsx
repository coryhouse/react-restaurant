import { type NewFood, foodTags } from "../types/food.types";
import { Input } from "../shared/Input";
import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ErrorMessage } from "../shared/ErrorMessage";
import { foodMutations, foodQueries } from "../query-factories/foods";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0),
  tags: z.array(z.enum(foodTags)).min(1, "Select at least one tag"),
  image: z.string(),
});

function Admin() {
  const navigate = useNavigate();
  const { foodId } = Route.useParams();
  const { data: food, isLoading } = useQuery({
    ...foodQueries.getFoodById(foodId),
    enabled: !!foodId,
  });

  const { mutateAsync: saveFood } = useMutation(
    foodMutations.saveFood(() => {
      navigate({ to: "/" }).then(() => {
        toast.success(`Food ${food ? "saved" : "added"}!`);
      });
    })
  );

  const form = useForm({
    defaultValues: food || newFood,
    onSubmit: async ({ value }) => {
      await saveFood(value);
    },
    validators: {
      onChange: formSchema,
    },
  });

  if (isLoading) return <Spinner />;
  if (foodId && !food) throw notFound(); //tanstack.com/router/latest/docs/framework/react/guide/not-found-errors#throwing-your-own-notfound-errors

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

        <form
          className="px-6 py-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field name="name">
              {(field) => (
                <Input
                  value={field.state.value}
                  id="name"
                  onChange={(e) => field.handleChange(e.target.value)}
                  label="Name"
                  error={field.state.meta.errors[0]?.message}
                />
              )}
            </form.Field>

            <form.Field name="price">
              {(field) => (
                <Input
                  value={field.state.value}
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  label="Price ($)"
                  error={field.state.meta.errors[0]?.message}
                />
              )}
            </form.Field>
          </div>

          <form.Field name="description">
            {(field) => (
              <Input
                value={field.state.value}
                id="description"
                onChange={(e) => field.handleChange(e.target.value)}
                label="Description"
                error={field.state.meta.errors[0]?.message}
              />
            )}
          </form.Field>

          <form.Field name="tags">
            {(field) => (
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-gray-700">
                  Tags
                </legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {foodTags.map((tag) => {
                    const id = "tag-" + tag;
                    return (
                      <label
                        key={tag}
                        htmlFor={id}
                        className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                          field.state.value.some((foodTag) => foodTag === tag)
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          id={id}
                          type="checkbox"
                          value={tag}
                          checked={field.state.value.some(
                            (foodTag) => foodTag === tag
                          )}
                          onChange={(event) => {
                            const updatedTags = event.target.checked
                              ? [...field.state.value, tag]
                              : field.state.value.filter((t) => t !== tag);
                            field.handleChange(updatedTags);
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{tag}</span>
                      </label>
                    );
                  })}
                  {field.state.meta.errors?.[0] && (
                    <ErrorMessage
                      message={field.state.meta.errors[0].message}
                    />
                  )}
                </div>
              </fieldset>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" center={false} /> Saving...
                    </div>
                  ) : foodId ? (
                    "Save Changes"
                  ) : (
                    "Add Food"
                  )}
                </button>
              </div>
            )}
          />
        </form>
      </div>
    </div>
  );
}
