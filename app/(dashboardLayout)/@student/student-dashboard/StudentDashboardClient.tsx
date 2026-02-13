"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, BookOpen, CheckCircle, ArrowRight, User, GraduationCap, TrendingUp 
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
  sessionDate: string;
  startTime: string;
  endTime: string;
  tutor: { user: { name: string } };
}

interface StudentProfile {
  name: string;
  bookings: Booking[];
}

export default function StudentDashboardClient({ initialProfile }: { initialProfile: StudentProfile }) {
  const [profile] = useState<StudentProfile>(initialProfile);

  const upcoming = profile.bookings.filter((b) => ["CONFIRMED", "PENDING"].includes(b.status));
  const completed = profile.bookings.filter((b) => b.status === "COMPLETED");

  // Formatters
  const formatSessionDate = (dateStr?: string) => {
    if (!dateStr) return "TBD";
    try { return format(new Date(dateStr), "MMM d, yyyy"); } 
    catch { return "Invalid date"; }
  };

  const formatSessionTime = (timeStr?: string) => {
    if (!timeStr) return "--:--";
    try { return format(new Date(`1970-01-01T${timeStr}`), "h:mm a"); } 
    catch { return timeStr; }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* HERO HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Dashboard
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 text-sm">
                Welcome back, <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{profile.name}</span>
              </p>
            </div>
          </div>
          <Link href="/book-session">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6">
              Book New Session
            </Button>
          </Link>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Total Sessions" 
            value={profile.bookings.length} 
            description="Total learning history"
            icon={<BookOpen className="h-5 w-5 text-indigo-500" />} 
          />
          <StatCard 
            title="Upcoming" 
            value={upcoming.length} 
            description="Scheduled for this week"
            icon={<Clock className="h-5 w-5 text-amber-500" />} 
          />
          <StatCard 
            title="Completion Rate" 
            value={profile.bookings.length > 0 ? `${Math.round((completed.length / profile.bookings.length) * 100)}%` : "0%"} 
            description="Finished sessions"
            icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} 
          />
        </div>

        {/* ACTIVITY SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Recent Activity
            </h2>
            <Link href="/student/bookings">
              <Button variant="link" className="text-indigo-600 dark:text-indigo-400 p-0 flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4">
            {profile.bookings.length > 0 ? (
              profile.bookings.slice(0, 4).map((b) => (
                <Card key={b.id} className="group overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-indigo-500/50 transition-all">
                  <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-zinc-100 font-bold border border-zinc-200 dark:border-zinc-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                        {b.tutor.user.name.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-zinc-900 dark:text-zinc-100">{b.tutor.user.name}</p>
                        <div className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 flex flex-wrap gap-x-4 gap-y-1">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                            {formatSessionDate(b.sessionDate)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-indigo-500" />
                            {formatSessionTime(b.startTime)} - {formatSessionTime(b.endTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-zinc-100 dark:border-zinc-800">
                      <Badge className={cn(
                        "rounded-lg px-3 py-1 font-medium",
                        b.status === "COMPLETED" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                        b.status === "CONFIRMED" && "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
                        b.status === "PENDING" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                        b.status === "CANCELLED" && "bg-red-500/10 text-red-600 border-red-500/20"
                      )} variant="outline">
                        {b.status.toLowerCase()}
                      </Badge>
                      <Link href={`/student/bookings/${b.id}`}>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-16 border-2 border-dashed rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-200 dark:border-zinc-800">
                <BookOpen className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500 dark:text-zinc-400">No bookings found. Start learning today!</p>
                <Link href="/tutors">
                    <Button className="mt-6 bg-indigo-600" size="sm">Find a Tutor</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* REUSABLE STAT CARD */

function StatCard({ title, value, icon, description }: { title: string; value: number | string; icon: React.ReactNode; description: string }) {
  return (
    <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{value}</div>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{description}</p>
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-100 dark:bg-zinc-900" />
    </Card>
  );
}