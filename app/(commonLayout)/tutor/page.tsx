"use client";

import { PageLoadingSpinner } from "@/components/layouts/LoadingSpinner";
import TutorCard from "@/components/layouts/TutorCard";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import Link from "next/link";
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

  const API_URL = env.NEXT_PUBLIC_FRONTEND_API_URL;

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/tutor/?search=${search ?? ""}`);
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
        Search results for <span className="text-primary">{search}</span>
      </h1>

      {tutors.length > 0 ? (
        // If tutors exist, show the grid
        <div className="grid md:grid-cols-3 gap-4">
          {tutors.map((tutor: Tutor) => (
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
      ) : (
        // If no tutors found, show this message
        <div className="text-center py-20 bg-muted/50 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No tutors found for {search}.
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto mb-6">
            We could not find any tutors matching {search}. Try searching for a
            different subject.
          </p>
          <Link href="/browse-tutors">
            <Button variant="outline" className="rounded-full">
              Clear Search
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
