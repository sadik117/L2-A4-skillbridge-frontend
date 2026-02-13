"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Calendar,
  Mail,
  GraduationCap,
  Clock,
  MessageSquare,
  UserCircle,
  Briefcase,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

/* Types */
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

export default function TutorDashboardClient({
  initialProfile,
}: {
  initialProfile: TutorProfile;
}) {
  const profile = initialProfile;

  const formatTime = (time: string) => {
    try {
      
      if (time.length === 5)
        return format(new Date(`2026-01-01T${time}`), "h:mm a");
      return format(new Date(time), "h:mm a");
    } catch {
      return time;
    }
  };

  const averageRating =
    profile.reviews.length > 0
      ? (
          profile.reviews.reduce((acc, r) => acc + r.rating, 0) /
          profile.reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 bg-zinc-50 dark:bg-[#09090b] min-h-screen transition-colors">
      {/* HEADER PROFILE CARD */}
      <div className="relative">
        <div className="h-32 w-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-t-2xl shadow-lg" />
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 -mt-12 mx-4 md:mx-8 shadow-xl relative z-10">
          <CardContent className="pt-0 flex flex-col md:flex-row md:items-end gap-6 pb-8 px-6">
            <div className="h-24 w-24 rounded-2xl bg-white dark:bg-zinc-900 border-4 border-white dark:border-zinc-950 flex items-center justify-center text-indigo-600 shadow-md">
              <UserCircle className="h-16 w-16" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {profile.user.name}
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                >
                  Professional Tutor
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" /> {profile.user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />{" "}
                  {averageRating} ({profile.reviews.length} reviews)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Categories & Availability */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-indigo-500" /> Specialties
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.category && profile.category.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {profile.category.map((cat) => (
                    <Badge key={cat.name}>{cat.name || "N/A"}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-500" /> Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile.availability.length > 0 ? (
                profile.availability.map((slot) => (
                  <div
                    key={slot.id}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 space-y-1"
                  >
                    <div className="flex flex-wrap gap-1">
                      {slot.daysOfWeek.map((day) => (
                        <span
                          key={day}
                          className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500 italic">
                  No recurring slots set.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Reviews */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-indigo-500" /> Student
                  Feedback
                </CardTitle>
                <CardDescription>
                  Recent reviews from your sessions
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.reviews.length > 0 ? (
                profile.reviews.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 group hover:border-indigo-500/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 text-xs font-bold">
                          {r.student.name.charAt(0)}
                        </div>
                        <p className="font-bold text-sm text-zinc-900 dark:text-zinc-50">
                          {r.student.name}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5",
                              i < r.rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-zinc-300 dark:text-zinc-700",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                      {r.comment}
                    </p>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center opacity-50">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 text-zinc-300" />
                  <p className="text-sm">No feedback received yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
