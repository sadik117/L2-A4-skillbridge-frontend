"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";
import { format } from "date-fns";

type Review = {
  id: string;
  rating: number;
  comment: string;
  student: { id: string; name: string };
  createdAt: string;
};

type AvailabilitySlot = {
  id: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
};

type TutorProfile = {
  user: { name: string; email: string; avatar?: string };
  category?: { name: string }[];
  availability: AvailabilitySlot[];
  reviews: Review[];
};

export default function TutorProfilePage() {
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/tutor/my-profile`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load profile");
      setProfile(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const formatTime = (time: string) => {
    try {
      return format(new Date(time), "h:mm a");
    } catch {
      return time;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (!profile) return <p className="text-red-500">Profile not found.</p>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6">
      {/* USER INFO */}
      <Card>
        <CardHeader>
          <CardTitle>{profile.user.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{profile.user.email}</p>
        </CardHeader>
        <CardContent>
          {profile.category && profile.category.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {profile.category.map((cat) => (
                <Badge key={cat.name}>{cat.name}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AVAILABILITY */}
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.availability.length === 0 && (
            <p className="text-sm text-muted-foreground">No availability set.</p>
          )}
          {profile.availability.map((slot) => (
            <div key={slot.id} className="flex justify-between text-sm border-b py-2">
              <span>{slot.daysOfWeek.join(", ")}</span>
              <span>
                {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* REVIEWS */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews ({profile.reviews.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {profile.reviews.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          )}
          {profile.reviews.map((r) => (
            <div key={r.id} className="border-b pb-2">
              <p className="font-medium">{r.student.name}</p>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
              <p className="text-xs text-gray-500">{r.rating} ⭐</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
