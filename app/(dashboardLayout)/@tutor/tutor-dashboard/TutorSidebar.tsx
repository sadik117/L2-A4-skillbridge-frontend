"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TutorSidebar() {
  const path = usePathname();

  const links = [
    { href: "/tutor", label: "Dashboard" },
    { href: "/tutor/availability", label: "Availability" },
    { href: "/tutor/profile", label: "Profile" },
  ];

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="font-bold text-lg mb-6">Tutor Panel</h2>

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
