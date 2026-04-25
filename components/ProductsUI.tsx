"use client";

import ProductCard from "./ProductCard/ProductCard";
import CommonInput from "@/ui/CommonInput/CommonInput";

import {
  ICartItem,
  IProduct,
} from "@/typescript/interfaces/CustomAllInterface";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FilterIcon from "@/ui/icons/FilterIcon";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Field, FieldGroup } from "./ui/field";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import useProduct from "@/hooks/useProduct";
import { getCurrentUser } from "@/utils/auth";
import { TUser } from "@/typescript/common.types";
import toast from "react-hot-toast";

const ProductsUI = () => {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const router = useRouter();
  const [cartItems, setCartItems] = useState<number[]>([]);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "null");
    if (existingCart?.products) {
      setCartItems(existingCart.products.map((p: ICartItem) => p.id));
    }
  }, []);

  const { products, loading, error } = useProduct();
  const categoriesList = ["beauty", "fragrances", "furniture", "groceries"];

  const [search, setSearch] = useState("");
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  //   Handel Checkbox
  const handleCategoryChange = (category: string) => {
    setTempCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleApplyFilter = () => {
    setSelectedCategories(tempCategories);
  };

  //   Filter Logic
  const filterProduct = products.filter((item: IProduct) => {
    const matchSearch =
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    return matchSearch && matchCategory;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="min-w-[500px]">
          <CommonInput
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Drawer direction="right">
          <DrawerTrigger>
            <Button className="w-[40px] h-[40px] ">
              <FilterIcon />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="w-[350px]">
            <DrawerHeader>
              <DrawerTitle>Filter Product</DrawerTitle>
            </DrawerHeader>
            <DrawerDescription className="p-4">
              <p className="mb-4">Product Category</p>
              <FieldGroup>
                {categoriesList.map((item) => (
                  <Field orientation="horizontal" key={item}>
                    <Checkbox
                      id={`beauty-${item}`}
                      name={`beauty-${item}`}
                      checked={tempCategories.includes(item)}
                      onCheckedChange={() => handleCategoryChange(item)}
                    />
                    <Label htmlFor={`beauty-${item}`} className="capitalize">
                      {item}
                    </Label>
                  </Field>
                ))}
              </FieldGroup>
            </DrawerDescription>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="w-full " onClick={handleApplyFilter}>
                  Submit
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button className="w-full" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <p className="mt-2 mb-5">Products {filterProduct.length}</p>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterProduct.map((item: IProduct) => (
          <ProductCard
            key={item.id}
            id={item.id}
            imageUrl={item.images?.[0] || "/fallback.png"}
            category={item.category}
            title={item.title}
            description={item.description}
            price={item.price}
            isInCart={cartItems.includes(item.id)}
            onAddtoCart={() => {
              const existingCart =
                JSON.parse(localStorage.getItem("cart") || "null") || {};

              if (cartItems.includes(item.id)) {
                router.push("/dashboard/cart");
                return;
              }

              let updatedCart;

              if (existingCart.products) {
                updatedCart = {
                  ...existingCart,
                  products: [...existingCart.products, { ...item, quantity: 1 }],
                };
              } else {
                updatedCart = {
                  id: user?.email,
                  products: [{ ...item, quantity: 1 }],
                };
              }
              toast.success("Product added to cart");
              localStorage.setItem("cart", JSON.stringify(updatedCart));
              setCartItems((prev) => [...prev, item.id]);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsUI;
