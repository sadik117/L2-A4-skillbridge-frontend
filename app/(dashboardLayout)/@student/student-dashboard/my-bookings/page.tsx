"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  Calendar,
  Clock,
  RefreshCw,
  DollarSign,
  X,
  CheckCircle,
  Clock4,
  CalendarCheck,
} from "lucide-react";
import { env } from "@/env";
import { format, parseISO, isPast } from "date-fns";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

/* Type declaration*/

type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";

type Booking = {
  id: string;
  status: BookingStatus;
  startTime: string;
  endTime: string;
  subject?: string;
  notes?: string;
  tutor: {
    user: {
      name: string;
      email: string;
      avatar?: string;
    };
    profile?: {
      hourlyRate?: number;
      subjects?: string[];
    };
  };
};

type StatusFilter = "all" | BookingStatus;

/* CONFIG  */

const statusConfig: Record<
  BookingStatus,
  { label: string; icon: JSX.Element; variant: any }
> = {
  CONFIRMED: {
    label: "Confirmed",
    icon: <CheckCircle className="h-3 w-3" />,
    variant: "default",
  },
  PENDING: {
    label: "Pending",
    icon: <Clock4 className="h-3 w-3" />,
    variant: "secondary",
  },
  COMPLETED: {
    label: "Completed",
    icon: <CalendarCheck className="h-3 w-3" />,
    variant: "success",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: <X className="h-3 w-3" />,
    variant: "destructive",
  },
};

/* PAGE  */

export default function StudentBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<"date" | "rate">("date");
  const [refreshing, setRefreshing] = useState(false);

  /* REVIEW STATE  */
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");

  /*  HELPERS  */

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

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  /*  FETCH  */

  const fetchBookings = async () => {
    try {
      setRefreshing(true);
      const res = await fetch(
        `${env.NEXT_PUBLIC_FRONTEND_API_URL}/student/my-bookings`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const processed = data.data.map((b: Booking) => ({
        ...b,
        status:
          b.status === "CONFIRMED" && isPast(parseISO(b.endTime))
            ? "COMPLETED"
            : b.status,
      }));

      setBookings(processed);
      setFilteredBookings(processed);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* FILTER  */

  useEffect(() => {
    let result = [...bookings];

    if (activeFilter !== "all")
      result = result.filter((b) => b.status === activeFilter);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.tutor.user.name.toLowerCase().includes(q) ||
          b.subject?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) =>
      sortBy === "date"
        ? +new Date(b.startTime) - +new Date(a.endTime)
        : (a.tutor.profile?.hourlyRate || 0) -
          (b.tutor.profile?.hourlyRate || 0)
    );

    setFilteredBookings(result);
  }, [bookings, searchQuery, activeFilter, sortBy]);


  /* REVIEW SUBMIT */

  const submitReview = async () => {
  if (!selectedBooking) return;

  try {
    setReviewLoading(true);
    setReviewError("");

    const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/review`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: selectedBooking.id,
        rating,
        comment,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      // duplicate review
      if (data.message?.includes("You already reviewed this session")) {
        toast.error("You have already reviewed this session.");

        setReviewOpen(false);
        return;
      }

      throw new Error(data.message);
    }

    // success
    toast("Thank you for your feedback!"  );

    setReviewOpen(false);
    fetchBookings();
  } catch (err: any) {
    toast( err.message || "Failed to submit review" );
  } finally {
    setReviewLoading(false);
  }
};


  /*  LOADING  */

  if (loading) {
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    );
  }

  /*  RENDER  */

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Bookings</h1>

        <Button className="text-gray-900" variant="outline" onClick={fetchBookings} disabled={refreshing}>
          <RefreshCw
            className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between text-gray-900">
        <Input
          placeholder="Search tutor / subject"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full lg:max-w-sm"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="rate">Rate</SelectItem>
            </SelectContent>
          </Select>

          <Tabs
            value={activeFilter}
            onValueChange={(v) => setActiveFilter(v as any)}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
              <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* BOOKINGS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBookings.map((b) => {
          const status = statusConfig[b.status];

          return (
            <Card key={b.id} className="overflow-hidden">
              {/* top indicator */}
              <div
                className={`h-1 ${
                  b.status === "COMPLETED"
                    ? "bg-primary"
                    : b.status === "CONFIRMED"
                    ? "bg-emerald-500 dark:bg-emerald-400"
                    : "bg-amber-500 dark:bg-amber-400"
                }`}
              />

              <CardHeader>
                <Badge variant={status.variant} className="w-fit">
                  {status.icon}
                  {status.label}
                </Badge>

                <CardTitle className="flex gap-3 mt-3 items-center">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                    {initials(b.tutor.user.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate">{b.tutor.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {b.subject || "General Tutoring"}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="text-sm space-y-1">
                  <div className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4" />
                    {safeDate(b.startTime)}
                  </div>
                  <div className="flex gap-2 items-center">
                    <Clock className="h-4 w-4" />
                    {formatTime(b.startTime)} – {formatTime(b.endTime)}
                  </div>
                </div>

                <div className="text-sm font-semibold">
                  <DollarSign className="inline h-4 w-4 mr-1" />
                  {b.tutor.profile?.hourlyRate ?? "N/A"} / hr
                </div>

                {/* ACTIONS */}
                {b.status === "COMPLETED" && (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedBooking(b);
                      setReviewOpen(true);
                      setRating(5);
                      setComment("");
                    }}
                  >
                    Leave Review
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* REVIEW MODAL */}
      {reviewOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setReviewOpen(false)}
          />

          <Card className="relative w-full max-w-md">
            <CardHeader>
              <CardTitle>Review Session</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedBooking.tutor.user.name}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <Select
                value={String(rating)}
                onValueChange={(v) => setRating(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <SelectItem key={r} value={String(r)}>
                      {r} Star{r > 1 && "s"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <textarea
                className="w-full rounded-md border border-border bg-background p-2 text-sm"
                rows={4}
                placeholder="Write your feedback..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button
                className="w-full"
                disabled={reviewLoading}
                onClick={submitReview}
              >
                {reviewLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
