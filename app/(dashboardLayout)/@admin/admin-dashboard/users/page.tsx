import { env } from "@/env";
import { cookies } from "next/headers";
import AdminUsersClient from "./AdminUsersClient";


async function getAllUsers() {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${API}/admin/all-users`, {
      headers: { "Cookie": cookieStore.toString() },
      next: { revalidate: 0 }, // Always fresh data for admin
    });
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function AdminUsersPage() {
  const users = await getAllUsers();
  return <AdminUsersClient initialUsers={users} />;
}