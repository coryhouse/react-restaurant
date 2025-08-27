import { QueryClient } from "@tanstack/query-core";

// This is used by both Tanstack DB and Tanstack Router.
// Note: Although this is the same queryClient config as Tanstack Query, Tanstack DB has no dependency on Tanstack Query
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
