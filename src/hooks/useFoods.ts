import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Food } from "../food";

const baseUrl = "http://localhost:3001/foods";

export function useFoods() {
  return useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const resp = await fetch(baseUrl);
      return (await resp.json()) as Food[];
    },
  });
}

export function useDeleteFood(onSuccess: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (foodId: number) => {
      fetch(baseUrl + "/" + foodId, {
        method: "DELETE",
      });
    },
    onSuccess,
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
}
