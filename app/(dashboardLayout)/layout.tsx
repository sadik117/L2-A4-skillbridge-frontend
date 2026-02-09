import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { userService } from "@/components/services/user.service";
import Sidebar from "./sidebar";

export default async function DashboardLayout({
  student,
  tutor,
  admin,
}: {
  children: ReactNode;
  admin: React.ReactNode;
  tutor: React.ReactNode;
  student: React.ReactNode;
}) {

  const { data } = await userService.getSession();

  if (!data) redirect("/login");

  if (data.user.banned) redirect("/");

  const role = data.user.role as "ADMIN" | "STUDENT" | "TUTOR";

  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} />
      <main className="flex-1 p-6 bg-gray-50">

        {role === "ADMIN" ? admin : role === "TUTOR" ? tutor : student}
        
      </main>
    </div>
  );
}
