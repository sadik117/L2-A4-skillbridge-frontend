"use client";

import { useState, useTransition, useMemo } from "react";
import { UserCheck, ShieldAlert, UserX, Search, Filter } from "lucide-react";
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { updateUserStatusAction } from "./serverAction";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT" | "TUTOR";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
};

export default function AdminUsersClient({ initialUsers }: { initialUsers: User[] }) {
  const [isPending, startTransition] = useTransition();
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    return initialUsers.filter(u => 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialUsers]);

  const handleStatusUpdate = (id: string, newStatus: "ACTIVE" | "BANNED") => {
    if (newStatus === "BANNED" && !confirm("Ban this user immediately?")) return;

    setActionLoadingId(id);
    startTransition(async () => {
      const result = await updateUserStatusAction(id, newStatus);
      if (result.success) {
        toast.success(`User is now ${newStatus.toLowerCase()}`);
      } else {
        toast.error(result.message);
      }
      setActionLoadingId(null);
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">User Management</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Control platform access and monitor roles.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-5 font-bold text-left text-zinc-500 uppercase tracking-widest text-[10px]">User Details</th>
                <th className="p-5 font-bold text-left text-zinc-500 uppercase tracking-widest text-[10px]">Role</th>
                <th className="p-5 font-bold text-left text-zinc-500 uppercase tracking-widest text-[10px]">Status</th>
                <th className="p-5 font-bold text-right text-zinc-500 uppercase tracking-widest text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors group">
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{user.name}</span>
                      <span className="text-xs text-zinc-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <Badge variant="secondary" className="rounded-lg font-bold text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 uppercase">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-5">
                    <Badge className={user.status === "ACTIVE" 
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                      : "bg-rose-500/10 text-rose-600 border-rose-500/20"}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-5 text-right">
                    {user.status === "ACTIVE" ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        disabled={actionLoadingId === user.id}
                        onClick={() => handleStatusUpdate(user.id, "BANNED")}
                      >
                        <UserX className="h-4 w-4 mr-2" /> Ban
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        disabled={actionLoadingId === user.id}
                        onClick={() => handleStatusUpdate(user.id, "ACTIVE")}
                      >
                        <UserCheck className="h-4 w-4 mr-2" /> Activate
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <ShieldAlert className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500 font-medium">No users found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}