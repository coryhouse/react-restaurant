import { QueryClient } from "@tanstack/query-core";

export const queryClient = new QueryClient({
  // Automatically invalidate queries on mutation success. More: https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations
  // mutationCache: new MutationCache({
  //   onSuccess: () => {
  //     queryClient.invalidateQueries();
  //   },
  // }),
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
