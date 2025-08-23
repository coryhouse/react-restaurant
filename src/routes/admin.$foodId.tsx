import { createFileRoute } from "@tanstack/react-router";
import { foodQueries } from "../query-factories/foods";
import { z } from "zod";
import { Admin } from "./admin";

export const Route = createFileRoute("/admin/$foodId")({
  params: {
    parse: (params) => ({
      foodId: z.string().parse(params.foodId),
    }),
  },
  component: () => <Admin Route={Route} />,
  loader: ({ context: { queryClient }, params: { foodId } }) => {
    queryClient.ensureQueryData(foodQueries.getFoodById(foodId));
  },
});
