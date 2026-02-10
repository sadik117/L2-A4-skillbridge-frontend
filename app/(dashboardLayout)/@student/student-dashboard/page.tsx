"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, BookOpen, CheckCircle, ArrowRight, User } from "lucide-react";
import { env } from "@/env";
import { format, parseISO } from "date-fns";
import Link from "next/link";

/* Type declaration  */
type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";

interface Booking {
  id: string;
  status: BookingStatus;
  sessionDate: string;
  startTime: string;
  endTime: string;
  tutor: { user: { name: string } };
}

interface StudentProfile {
  name: string;
  bookings: Booking[];
}

export default function StudentDashboardPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/student/my-profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setProfile(data.data))
      .catch((err) => console.error("Failed to fetch profile", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!profile) return null;

  const upcoming = profile.bookings.filter((b) => ["CONFIRMED", "PENDING"].includes(b.status));
  const completed = profile.bookings.filter((b) => b.status === "COMPLETED");

  // Formatters
  const formatSessionDate = (dateStr?: string) => {
    if (!dateStr) return "TBD";
    try { return format(parseISO(dateStr), "MMM d, yyyy"); } 
    catch { return "Invalid date"; }
  };

  const formatSessionTime = (timeStr?: string) => {
    if (!timeStr) return "--:--";
    try { return format(parseISO(`1970-01-01T${timeStr}`), "h:mm a"); } 
    catch { return timeStr; }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <User className="h-4 w-4" /> Welcome back, <span className="text-foreground font-medium">{profile.name}</span>
          </p>
        </div>

        {/* OVERVIEW STATS - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard 
            title="Total Bookings" 
            value={profile.bookings.length} 
            icon={<BookOpen className="h-5 w-5 text-blue-500" />} 
          />
          <StatCard 
            title="Upcoming Sessions" 
            value={upcoming.length} 
            icon={<Clock className="h-5 w-5 text-amber-500" />} 
          />
          <StatCard 
            title="Completed" 
            value={completed.length} 
            icon={<CheckCircle className="h-5 w-5 text-emerald-500" />} 
          />
        </div>

        {/* RECENT BOOKINGS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Activity</h2>
            <Link href="/student-dashboard/my-bookings">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-3">
            {profile.bookings.length > 0 ? (
              profile.bookings.slice(0, 5).map((b) => (
                <Card key={b.id} className="dark:bg-zinc-950 dark:border-zinc-800 hover:bg-accent/50 transition-colors">
                  <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold hidden sm:flex">
                        {b.tutor.user.name.charAt(0)}
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold leading-none">{b.tutor.user.name}</p>
                        <div className="text-xs md:text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatSessionDate(b.sessionDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {formatSessionTime(b.startTime)} - {formatSessionTime(b.endTime)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                      <Badge className="capitalize px-3 py-0.5" variant={
                        b.status === "COMPLETED" ? "outline" : 
                        b.status === "CANCELLED" ? "destructive" : "default"
                      }>
                        {b.status.toLowerCase()}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full sm:hidden">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border border-dashed rounded-xl bg-muted/20">
                <p className="text-muted-foreground">No bookings found. Start learning today!</p>
                <Button className="mt-4" size="sm">Find a Tutor</Button>
              </div>
            )}
          </div>
          
          <Link href="/student-dashboard/my-bookings" className="block sm:hidden">
            <Button variant="outline" className="w-full">
              View All Bookings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/*  REUSABLE STAT CARD  */

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="dark:bg-zinc-950 dark:border-zinc-800 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}