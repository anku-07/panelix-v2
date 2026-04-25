import { IProduct } from "@/typescript/interfaces/CustomAllInterface";
import { ChevronLeft, CreditCard, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CheckoutUI = () => {
  const router = useRouter();

  const [cart, setCart] = useState<IProduct[]>(() => {
    if (typeof window === "undefined") return [];

    const data = JSON.parse(localStorage.getItem("cart") || "null");
    return data?.products || [];
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price || 0), 0);
  const shipping = 0.0; // Fixed free shipping based on your theme
  const total = subtotal + shipping;

  return (
    <div className=" bg-background text-foreground ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/dashboard/cart"
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-heading">Secure Checkout</h1>
            <p className="text-muted-foreground text-sm">
              Review your details and complete your purchase.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Shipping Section */}
            <section className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-heading">
                  Shipping Address
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-background border border-input rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-background border border-input rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full md:col-span-2 bg-background border border-input rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full md:col-span-2 bg-background border border-input rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </section>

            {/* Payment Section */}
            <section className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-heading">
                  Payment Method
                </h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-slate-700 rounded shadow-sm"></div>
                    <span className="font-medium text-sm">
                      Credit / Debit Card
                    </span>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-primary"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full md:col-span-2 bg-background border border-input rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-background border border-input rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full bg-background border border-input rounded-xl p-3 focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-card border border-border sticky top-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 font-heading">
                Your Order
              </h2>

              <div className="max-h-[300px] overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex gap-3">
                      <span className="text-muted-foreground">1x</span>
                      <span className="font-medium line-clamp-1">
                        {item.title}
                      </span>
                    </div>
                    <span className="font-semibold text-primary">
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-6 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Pay Now
              </button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Your transaction is encrypted and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutUI;
