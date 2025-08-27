import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, Router } from "@tanstack/react-router";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { routeTree } from "./routeTree.gen";
import { Toaster } from "sonner";
import { UserContextProvider } from "./UserContext";
import { QueryClient } from "@tanstack/query-core";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";
import { foodSchema } from "./types/food.types";
import ky from "ky";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      refetchOnWindowFocus: true,
      retry: false,
    },
    mutations: {
      retry: false,
      throwOnError: true,
    },
  },
});

const baseUrl = "http://localhost:3001/foods";

export class FoodNotFoundError extends Error {}

export const foodCollection = createCollection(
  queryCollectionOptions({
    queryClient,
    queryKey: ["foods"],
    queryFn: async () => {
      const json = await ky.get(baseUrl).json();
      return foodSchema.array().parse(json);
    },
    getKey: (item) => item.id,
    schema: foodSchema, // Type the collection via Zod (so don't need to specify types elsewhere such as getKey)
    // Handle all CRUD operations
    onInsert: async ({ transaction }) => {
      const { changes: newFood } = transaction.mutations[0];
      return await ky.post(baseUrl, { json: newFood });
    },
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0];
      return await ky.put(`${baseUrl}/${original.id}`, { json: modified });
    },
    onDelete: async ({ transaction }) => {
      const { key } = transaction.mutations[0];
      return await ky.delete(`${baseUrl}/${key}`);
    },
  })
);

// Type router context so it can be referenced in root. Must be in sync with the context in the router below.
export type MyRouterContext = {
  queryClient: QueryClient;
  defaultPreloadStaleTime: number;
};

// Create router instance
const router = new Router({
  routeTree,
  context: {
    queryClient,
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
  },
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>Oops!</div>}>
      <Toaster richColors position="top-right" />
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ErrorBoundary>
  </StrictMode>
);
