"use client";

import AuthWrapper from "@/layout/AuthWrapper/AuthWrapper";
import { TUser } from "@/typescript/common.types";
import Button from "@/ui/Button/Button";
import CommonInput from "@/ui/CommonInput/CommonInput";
import { getUsers, saveUsers } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function SignUp() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!userName || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const users = getUsers();

    const userExists = users.find((u: TUser) => u.email === email);

    if (userExists) {
      toast.error("Email already exists!");
      return;
    }

    const newUser = {
      userName,
      email,
      password,
    };

    saveUsers([...users, newUser])

    toast.success("New user created !!");

    router.push("/auth/login");
  };

  return (
    <div>
      <AuthWrapper title="Sign Up" subtitle="Create a new account.">
        <div className="mb-4">
          <CommonInput
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <CommonInput
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <CommonInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            className="w-full"
            onClick={handleSignup}
          >
            Submit
          </Button>
        </div>
        <div className="mt-6 text-center">
          <p className="font-body text-sm text-secondary">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </AuthWrapper>
    </div>
  );
}

export default SignUp;
