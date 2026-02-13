"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

interface UserType {
  name?: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData: UserType) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { isLoggedIn: !!user, user, login, logout } },
    children
  );
};

export const useAuth = () => useContext(AuthContext);
