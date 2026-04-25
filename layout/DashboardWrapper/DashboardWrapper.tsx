import React from "react";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../DashboardHeader/DashboardHeader";

interface DashboardWrapperProps {
  title?: string;
  children: React.ReactNode;
}

function DashboardWrapper({ title, children }: DashboardWrapperProps) {
  return (
    <div className="flex ">
      <DashboardSidebar />
      <div className="w-[calc(100%-255px)]">
        <DashboardHeader title={title} />
        <main className="p-6 lg:p-8 max-h-[calc(100svh-80px)] overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default DashboardWrapper;
