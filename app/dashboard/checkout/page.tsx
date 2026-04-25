"use client";

import CheckoutUI from "@/components/CheckoutUI";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import React from "react";

function Checkout() {
  
  return (
    <DashboardWrapper title="Checkout">
      <CheckoutUI />
    </DashboardWrapper>
  );
}

export default Checkout;
