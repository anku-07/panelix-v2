import { TUser } from "@/typescript/common.types";

export const getUsers = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const saveUsers = (users: TUser[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("users", JSON.stringify(users));
};

export const setCurrentUser = (user: TUser) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("currentUser") || "null");
};

export const logout = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("currentUser");
};