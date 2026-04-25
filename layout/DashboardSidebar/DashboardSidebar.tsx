"use client";

import CartIcon from "@/ui/icons/SIdebarIcons/CartIcon";
import DashboardIcon from "@/ui/icons/SIdebarIcons/DashboardIcon";
import ProductsIcon from "@/ui/icons/SIdebarIcons/ProductsIcon";
import { getCurrentUser } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const commonPath = "/dashboard";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: `${commonPath}`,
  },
  { label: "Products", icon: <ProductsIcon />, path: `${commonPath}/products` },
  { label: "Cart", icon: <CartIcon />, path: `${commonPath}/cart` },
  { label: "Settings", icon: "⚙️", path: `${commonPath}/settings` },
];

function DashboardSidebar() {
  // const [user, setUser] = useState(() => {
  //   if (typeof window === "undefined") return null;
  //   return getCurrentUser();
  // });

  const pathname = usePathname();

  const router = useRouter();

  return (
    <aside className="h-screen w-[255px] bg-surface border-r border-border flex flex-col transition-all duration-300">
      {/* 1. Logo / Brand Section */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-heading text-xl font-bold text-foreground tracking-tight">
            GeminiDev
          </span>
        </div>
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all cursor-pointer
                ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-secondary hover:bg-background hover:text-foreground"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* 3. User / Profile Section */}
      {/* <div className="p-4 border-t border-border bg-background/50">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-background transition-colors cursor-pointer text-left">
          <div className="w-10 h-10 rounded-full bg-secondary/20 border border-border flex items-center justify-center text-foreground font-bold">
            {user?.userName?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-body text-sm font-semibold text-foreground truncate">
              {user?.userName}
            </p>
            <p className="font-body text-xs text-secondary truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div> */}
    </aside>
  );
}

export default DashboardSidebar;
