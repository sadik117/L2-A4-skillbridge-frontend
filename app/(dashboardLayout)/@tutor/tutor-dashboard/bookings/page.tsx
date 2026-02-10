"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  CalendarCheck,
  User,
  Clock,
  Mail,
  Calendar,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  MoreVertical,
  RefreshCw,
  Filter,
  ChevronDown,
  Eye,
} from "lucide-react";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Booking = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  startTime: string;
  endTime: string;
  sessionDate: string;
  totalPrice?: number;
  subject?: string;
  student: {
    name: string;
    email: string;
    avatar?: string;
  };
  notes?: string;
};

type DashboardStats = {
  totalEarnings: number;
  upcomingSessions: number;
  completedSessions: number;
  avgRating?: number;
};

const statusConfig = {
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: CheckCircle2,
  },
  PENDING: {
    label: "Pending",
    color: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    icon: Clock,
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: CalendarCheck,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    icon: AlertCircle,
  },
};

export default function TutorDashboardPage() {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    totalEarnings: 0,
    upcomingSessions: 0,
    completedSessions: 0,
    avgRating: 4.8,
  });
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchBookings = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`${API}/booking/tutor-bookings`, {
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      const fetchedBookings = json.data || [];
      setBookings(fetchedBookings);
      setFilteredBookings(fetchedBookings);

      // Calculate stats
      const upcoming = fetchedBookings.filter(
        (b) => b.status === "CONFIRMED" || b.status === "PENDING",
      ).length;

      const completed = fetchedBookings.filter(
        (b) => b.status === "COMPLETED",
      ).length;

      const earnings = fetchedBookings
        .filter((b) => b.status === "COMPLETED")
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

      setStats({
        totalEarnings: earnings,
        upcomingSessions: upcoming,
        completedSessions: completed,
        avgRating: 4.8,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter((b) => b.status === statusFilter));
    }
  }, [statusFilter, bookings]);

  const markCompleted = async (bookingId: string) => {
    if (
      !confirm("Mark this session as completed? This action cannot be undone.")
    ) {
      return;
    }

    setActionLoading(bookingId);
    try {
      const res = await fetch(`${API}/booking/complete/${bookingId}`, {
        method: "PATCH",
        credentials: "include",
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      // Update UI instantly
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "COMPLETED" } : b,
        ),
      );

      // Update stats
      setStats((prev) => ({
        ...prev,
        upcomingSessions: prev.upcomingSessions - 1,
        completedSessions: prev.completedSessions + 1,
      }));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const safeDate = (value: string | Date) => {
  try {
    return format(new Date(value), "EEE, MMM d, yyyy");
  } catch {
    return "Invalid date";
  }
};

const formatTime = (value: string | Date) => {
  try {
    return format(new Date(value), "h:mm a");
  } catch {
    return "Invalid time";
  }
};

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {/* Skeleton Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="h-8 w-48 bg-muted rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-64 bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-muted rounded-lg animate-pulse" />
          </div>

          {/* Skeleton Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>

          {/* Skeleton Bookings */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Tutor Dashboard
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Manage your sessions, earnings, and student interactions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBookings}
              disabled={refreshing}
              className="gap-2 border-border hover:bg-accent"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Button
              variant="default"
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Calendar className="h-4 w-4" />
              Schedule Session
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Earnings Card */}
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Total Earnings
                  </p>
                  <p className="text-2xl font-bold mt-2">
                    ${stats.totalEarnings.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% from last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Upcoming Sessions
                  </p>
                  <p className="text-2xl font-bold mt-2">
                    {stats.upcomingSessions}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <CalendarDays className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Sessions */}
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Completed Sessions
                  </p>
                  <p className="text-2xl font-bold mt-2">
                    {stats.completedSessions}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">All time</p>
                </div>
                <div className="p-3 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Card */}
          <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold mt-2">
                    {stats.avgRating}/5.0
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on 42 reviews
                  </p>
                </div>
                <div className="p-3 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                  <BarChart3 className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Failed to load bookings</p>
              <p className="text-sm opacity-90 mt-1">{error}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError("")}
              className="h-8 w-8 p-0"
            >
              &times;
            </Button>
          </div>
        )}

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <p className="text-sm text-muted-foreground">
              {filteredBookings.length} of {bookings.length} sessions
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                <option value="all">All Status</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <Card className="border-dashed border-2 border-border bg-transparent">
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
              <p className="text-muted-foreground">
                {statusFilter !== "all"
                  ? `No ${statusFilter.toLowerCase()} sessions`
                  : "You don't have any bookings yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const StatusIcon = statusConfig[booking.status].icon;
              return (
                <Card
                  key={booking.id}
                  className="border-border bg-card hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Student Info */}
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center border border-primary/20">
                              {booking.student.avatar ? (
                                <img
                                  src={booking.student.avatar}
                                  alt={booking.student.name}
                                  className="h-full w-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="font-semibold text-primary text-sm">
                                  {getInitials(booking.student.name)}
                                </span>
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-background rounded-full border border-border flex items-center justify-center">
                              <User className="h-2.5 w-2.5 text-primary" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">
                                {booking.student.name}
                              </h3>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "gap-1.5 text-xs",
                                  statusConfig[booking.status].text,
                                  statusConfig[booking.status].bg,
                                )}
                              >
                                <StatusIcon className="h-3 w-3" />
                                {statusConfig[booking.status].label}
                              </Badge>
                            </div>

                            <div className="items-center gap-8 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5" />
                                <span className="truncate">
                                  {booking.student.email}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{safeDate(booking.startTime)}</span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                <span>
                                  {formatTime(booking.startTime)} -{" "}
                                  {formatTime(booking.endTime)}
                                </span>
                              </div>
                            </div>

                            {booking.subject && (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-full">
                                <span className="text-xs font-medium">
                                  {booking.subject}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          {booking.status !== "COMPLETED" &&
                            booking.status !== "CANCELLED" && (
                              <Button
                                onClick={() => markCompleted(booking.id)}
                                disabled={actionLoading === booking.id}
                                className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                                size="sm"
                              >
                                {actionLoading === booking.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <CalendarCheck className="h-4 w-4" />
                                )}
                                Mark Complete
                              </Button>
                            )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 border-border hover:bg-accent"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Notes Section */}
                      {booking.notes && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground font-medium mb-1">
                            Student Notes:
                          </p>
                          <p className="text-sm bg-muted/30 p-3 rounded-lg">
                            {booking.notes}
                          </p>
                        </div>
                      )}

                      {/* Price */}
                      {booking.totalPrice && (
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Session duration:{" "}
                            {booking.startTime && booking.endTime
                              ? `${Math.round((new Date(`1970-01-01T${booking.endTime}`).getTime() - new Date(`1970-01-01T${booking.startTime}`).getTime()) / (1000 * 60 * 60))} hours`
                              : "N/A"}
                          </div>
                          <div className="text-lg font-bold text-primary">
                            ${booking.totalPrice.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
