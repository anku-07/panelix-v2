"use client";

import { useRouter } from "next/navigation";
import React from "react";

const SuccessUI = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Order Successful</h1>
      <p className="text-muted-foreground mb-6">Thank you for your purchase!</p>

      <button
        onClick={() => router.push("/dashboard/products")}
        className="px-6 py-3 bg-primary text-white rounded-xl cursor-pointer hover:bg-primary/90 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default SuccessUI;
