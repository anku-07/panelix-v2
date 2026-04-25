"use client";

import {
  ICartItem,
  IProduct,
} from "@/typescript/interfaces/CustomAllInterface";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react"; // Optional: npm i lucide-react
import { useRouter } from "next/navigation";

function CartUI() {
  const router = useRouter();
  const [cart, setCart] = useState<ICartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const data = JSON.parse(localStorage.getItem("cart") || "null");
    return data?.products || [];
  });

  const removeCartProduct = (id: number) => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "{}");
    if (!cartData?.products) return;
    const updatedCartData = cartData.products.filter(
      (cart: ICartItem) => cart.id !== id,
    );

    setCart(updatedCartData);

    localStorage.setItem("cart", JSON.stringify({ products: updatedCartData }));
  };

  const quantityIncresedHandler = (id: number) => {
    console.log("clicked id", id);

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item?.quantity + 1 } : item,
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify({ products: updatedCart }));
    console.log("updatedCartd", updatedCart);
  };

  const quantityDecresedHandler = (id: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id !== id) return item;

        // if quantity is 1 → remove item
        if (item.quantity === 1) return null;

        // otherwise decrease
        return { ...item, quantity: item.quantity - 1 };
      })
      .filter(Boolean) as ICartItem[];

      

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify({ products: updatedCart }));
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center  space-y-4">
        <div className="p-6 rounded-full bg-muted">
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold font-heading">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Looks like you haven t added anything yet.
        </p>
        <button
          className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all cursor-pointer"
          onClick={() => router.push("/dashboard/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0,
  );

  console.log("cart data", cart);

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-8 group cursor-pointer w-fit">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span
          className="text-sm font-medium  cursor-pointer"
          onClick={() => router.push("/dashboard/products")}
        >
          Back to Shop
        </span>
      </div>

      <h1 className="text-4xl font-bold font-heading mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Products List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item: ICartItem) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-muted">
                <Image
                  src={item.images?.[0] || "/placeholder.png"}
                  fill
                  className="object-cover"
                  alt={item.title}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">
                  {item.category}
                </p>
                <p className="mt-2 font-bold text-primary">${item.price}</p>
                <div className="flex items-center bg-muted/50 w-fit rounded-full py-2 px-3 border border-border shadow-sm mt-2">
                  {/* Decrease Button */}
                  <button
                    className="flex h-6 w-6 items-center justify-center rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 active:scale-95 disabled:opacity-50"
                    aria-label="Decrease quantity"
                    onClick={() => quantityDecresedHandler(item.id)}
                  >
                    <span className="text-lg font-medium">−</span>
                  </button>

                  {/* Quantity Display */}
                  <div className="px-4 min-w-[3rem] text-center">
                    <p className="text-sm font-semibold text-foreground">
                      <span className="text-muted-foreground font-normal mr-1">
                        Qty:
                      </span>
                      {item?.quantity || 0}
                    </p>
                  </div>

                  {/* Increase Button */}
                  <button
                    className="flex h-6 w-6 items-center justify-center rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 active:scale-95"
                    aria-label="Increase quantity"
                    onClick={() => quantityIncresedHandler(item.id)}
                  >
                    <span className="text-lg font-medium">+</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeCartProduct(item.id)}
                className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-3xl bg-card border border-border sticky top-24">
            <h2 className="text-xl font-bold mb-6 font-heading">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
              onClick={() => router.push("/dashboard/checkout")}
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartUI;
