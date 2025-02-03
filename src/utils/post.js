import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export const useAddProductQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      return api.post("/products/add/", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

export const useAddCartQuery = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      return api.post("/cart/add/", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data) => {
      return api.post("/checkout/", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout"] });
    },
    onError: (error) => {
      alert(error.response.data.error)
      console.log(error);
    },
  });
  return mutation;
};
