"use client";

import { PageLoadingSpinner } from "@/components/layouts/LoadingSpinner";
import TutorCard from "@/components/layouts/TutorCard";
import { env } from "@/env";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TutorsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  type Tutor = {
    id: string;
    user: { name: string };
    category: { name: string };
    bio?: string;
    hourlyRate?: number;
  };

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = env.NEXT_PUBLIC_FRONTEND_API_URL

useEffect(() => {
  const fetchTutors = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/tutor/?search=${search ?? ""}`
      );
      const data = await res.json();
      console.log(data);
      
      setTutors(data?.data || []); 
    } catch (error) {
      console.error("Fetch failed:", error);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  };

  fetchTutors();
}, [search, API_URL]);

  if (loading) return <PageLoadingSpinner></PageLoadingSpinner>;

  return (
    <div className="container py-8 mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">
        Search results for {search}
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        {tutors.map((tutor : Tutor) => (
          <TutorCard
            key={tutor.id}
            tutor={{
              ...tutor,
              bio: tutor.bio ?? "",
              hourlyRate: tutor.hourlyRate ?? 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
