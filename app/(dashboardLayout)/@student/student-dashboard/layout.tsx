import { ReactNode } from "react";
import { redirect } from "next/navigation";
import StudentSidebar from "./StudentSidebar";
import { userService } from "@/components/services/user.service";



export default async function Layout({ children }: { children: ReactNode }) {
   const { data } = await userService.getSession();

  if (!data) redirect("/login");
  if (data.role !== "STUDENT") redirect("/");

  return (
    <div className="min-h-screen flex">
      <StudentSidebar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
