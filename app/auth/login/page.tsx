"use client";

import AuthWrapper from "@/layout/AuthWrapper/AuthWrapper";
import { TUser } from "@/typescript/common.types";
import Button from "@/ui/Button/Button";
import CommonInput from "@/ui/CommonInput/CommonInput";
import { getUsers, setCurrentUser } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const users = getUsers();

    const foundUser = users.find(
      (u: TUser) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      toast.error("Invalid email or password!");
      return;
    }

    setCurrentUser(foundUser);
    toast.success("Login successful!");
    router.push("/dashboard");
  };

  return (
    <div>
      <AuthWrapper
        title="Login"
        subtitle="Welcome back! Please enter your details."
      >
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
            onClick={handleLogin}
          >
            Submit
          </Button>
        </div>
        <div className="mt-6 text-center">
          <p className="font-body text-sm text-secondary">
            Dont have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </AuthWrapper>
    </div>
  );
}

export default Login;
