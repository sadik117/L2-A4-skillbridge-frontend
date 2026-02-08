"use client";

import { create } from "zustand";
import { authClient } from "@/lib/auth-client";

interface AuthState {
  user: any | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: any | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const { data } = await authClient.getSession();
      set({ user: data?.user ?? null, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  setUser: (user) => set({ user }),

  logout: async () => {
    await authClient.signOut();
    set({ user: null });
  },
}));
