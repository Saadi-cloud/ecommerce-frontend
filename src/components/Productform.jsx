import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddProductQuery } from "@/utils/post";
import { useEditProductQuery } from "@/utils/put";

const Productform = ({ mode = "add", product = null }) => {
  
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    stock: "",
    rating: "",
    image: null,
  });
  const addProductMutation = useAddProductQuery();
  const editProductMutation = useEditProductQuery(product?.id);

  useEffect(() => {
    if (mode === "edit" && product) {
      // Prefill form with product details in edit mode
      setFormData({
        product_name: product.product_name || "",
        price: product.price || "",
        stock: product.stock || "",
        rating: product.rating || "",
        image: null, // Images are not prefilled, user must reselect
      });
    }
  }, [mode, product]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("product_name", formData.product_name);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("rating", formData.rating);
    if (formData.image) {
      data.append("image", formData.image);
    }
    try {
      if (mode === "add") {
        await addProductMutation.mutateAsync(data);
        alert("Product added successfully!");
      } else if (mode === "edit") {
        await editProductMutation.mutateAsync(data);
        alert("Product updated successfully!");
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            {mode === "add" ? "Add Product" : "Edit Product"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {mode === "add" ? "Add Product" : "Edit Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product_name" className="text-right">
                Product Name
              </Label>
              <Input
                id="product_name"
                value={formData.product_name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>
            <DialogClose asChild>
              <Button type="submit">
                {mode === "add" ? "Add Product" : "Save Changes"}
              </Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Productform;
