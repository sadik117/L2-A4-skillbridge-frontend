"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { env } from "@/env";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/layouts/LoadingSpinner";
import { UserCheck, ShieldAlert, UserX } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT" | "TUTOR";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${env.NEXT_PUBLIC_FRONTEND_API_URL}/admin/all-users`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();
      setUsers(data.data || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (id: string, status: "ACTIVE" | "BANNED") => {
    // Basic confirmation for banning
    if (
      status === "BANNED" &&
      !confirm(
        "Are you sure you want to ban this user? They will lose platform access immediately.",
      )
    ) {
      return;
    }

    try {
      setActionLoading(id);
      const res = await fetch(
        `${env.NEXT_PUBLIC_FRONTEND_API_URL}/admin/user-status/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );

      if (!res.ok) throw new Error();
      toast.success(`User ${status === "BANNED" ? "banned" : "activated"}`);
      fetchUsers();
    } catch {
      toast.error("Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 p-4 md:p-0">
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          User Management
        </h1>
        <p className="text-sm text-gray-900">
          Monitor roles and control access for platform members.
        </p>
      </div>

      {/* TABLE CONTAINER */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border transition-colors">
                <th className="p-4 font-semibold text-left text-muted-foreground">
                  Name
                </th>
                <th className="p-4 font-semibold text-left text-muted-foreground">
                  Email
                </th>
                <th className="p-4 font-semibold text-left text-muted-foreground">
                  Role
                </th>
                <th className="p-4 font-semibold text-left text-muted-foreground">
                  Status
                </th>
                <th className="p-4 font-semibold text-right text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <td className="p-4 font-medium text-foreground">{u.name}</td>
                  <td className="p-4 text-muted-foreground">{u.email}</td>
                  <td className="p-4">
                    <span className="uppercase text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-secondary text-secondary-foreground">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <Badge
                      variant={
                        u.status === "ACTIVE" ? "default" : "destructive"
                      }
                      className={
                        u.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20"
                          : ""
                      }
                    >
                      {u.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-right">
                    {u.status === "ACTIVE" ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        disabled={actionLoading === u.id}
                        onClick={() => updateStatus(u.id, "BANNED")}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Ban
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                        disabled={actionLoading === u.id}
                        onClick={() => updateStatus(u.id, "ACTIVE")}
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        Activate
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <ShieldAlert className="h-10 w-10 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground font-medium">
                No users found
              </p>
              <p className="text-xs text-muted-foreground">
                Try refreshing or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
