// providers/AuthProvider.tsx - ALTERNATIVE APPROACH
"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut as authSignOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isLoading, isPending } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name || "",
        email: session.user.email || "",
        role: (session.user.role as "student" | "tutor" | "admin") || "student",
        avatar: session.user.image || undefined,
        phone: session.user.phone || undefined,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  const signOut = async () => {
    try {
      await authSignOut();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const refreshSession = async () => {
    // Better Auth might handle session refresh automatically
    // If not, implement manual refresh logic here
  };

  const value = {
    user,
    isLoading: isLoading || isPending,
    isAuthenticated: !!session?.user,
    signOut,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}