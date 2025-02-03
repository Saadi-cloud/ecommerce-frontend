import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export const useDeleteProductMutation = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (product_id) => {
        // Log API call details
        return api.delete(`/products/delete/${product_id}/`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey : ["products"]});
      },
      onError: (error) => {
        console.log("API error:", error);
      }
    });
  
    return mutation;
  };