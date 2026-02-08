"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "./useAuthStore";

export function AuthInit() {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user ?? null);
      } catch {
        setUser(null);
      }
    };

    init();
  }, [setUser]);

  return null;
}
