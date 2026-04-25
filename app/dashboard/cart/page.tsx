"use client";

import CartUI from "@/components/CartUI";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import React from "react";

function Cart() {
  return (
    <DashboardWrapper title="Cart">
      <CartUI />
    </DashboardWrapper>
  );
}

export default Cart;
