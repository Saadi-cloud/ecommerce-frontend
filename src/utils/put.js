import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export const useEditProductQuery = (product_id) => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (data) => {
        return api.put(`/products/update/${product_id}/`, data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey : ["products"]});
      },
      onError: (error) => {
        console.error("Mutation error:", error.message);
      }
    });
  
    return mutation;
  };