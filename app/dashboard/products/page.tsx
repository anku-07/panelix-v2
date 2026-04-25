"use client";

import ProductsUI from "@/components/ProductsUI";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import React from "react";

function Products() {
  return (
    <DashboardWrapper title="Products">
      <ProductsUI />
    </DashboardWrapper>
  );
}

export default Products;
