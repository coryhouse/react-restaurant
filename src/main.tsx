import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, Router } from "@tanstack/react-router";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Toaster } from "sonner";
import { UserContextProvider } from "./UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
