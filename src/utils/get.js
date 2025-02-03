import { useQuery } from "@tanstack/react-query";
import { api } from "./api";

export const useProductListQuery = () => {
    return useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        return api.get("/products").then((res) => res.data);
      },
    });
  };

export const useCartListQuery = () => {
    return useQuery({
      queryKey: ["cart"],
      queryFn: async () => {
        return api.get("/cart").then((res) => res.data);
      },
    });
  };
