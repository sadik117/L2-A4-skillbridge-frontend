"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StudentSidebar() {
  const path = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/bookings", label: "My Bookings" },
    { href: "/dashboard/profile", label: "Profile" },
  ];

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="font-bold text-lg mb-6">Student Panel</h2>

      <nav className="space-y-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`block p-2 rounded ${
              path === l.href ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
