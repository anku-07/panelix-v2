"use client";

import CommonCards from "@/components/CommonCards/CommonCards";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { getCurrentUser } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import userApi from "@/api/user.api";
import CountUp from "react-countup";

function Dashboard() {
  const [users, setUsers] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();

    const fetchTodos = async () => {
      const data = await userApi.getAllUser();
      setUsers(data.users);
    };

    fetchTodos();

    if (!user) {
      router.push("/auth/login");
    }
  }, []);

  // console.log("users", users);

  return (
    <DashboardWrapper title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CommonCards>
          <p className="text-secondary text-sm mb-2">Revenue</p>
          <p className="text-foreground text-2xl font-bold">
            $ <CountUp end={45231.89} duration={2.75} />{" "}
          </p>
        </CommonCards>
        <CommonCards>
          <p className="text-secondary text-sm mb-2">Users</p>
          <p className="text-foreground text-2xl font-bold">
            {" "}
            <CountUp end={users.length} duration={2.75} /> +
          </p>
        </CommonCards>
        <CommonCards>
          <p className="text-secondary text-sm mb-2">Orders</p>
          <p className="text-foreground text-2xl font-bold">
            {" "}
            <CountUp end={145231.89} duration={2.75} /> +
          </p>
        </CommonCards>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CommonCards>charts</CommonCards>
        <div className="">table </div>
      </div> */}
    </DashboardWrapper>
  );
}

export default Dashboard;
