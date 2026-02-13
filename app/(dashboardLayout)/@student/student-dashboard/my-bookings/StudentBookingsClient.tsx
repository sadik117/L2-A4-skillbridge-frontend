"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Calendar, Clock, RefreshCw, DollarSign, X, CheckCircle, Clock4, CalendarCheck, Star } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { submitReviewAction } from "./serverActions";


type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";

type Booking = {
  id: string;
  status: BookingStatus;
  startTime: string;
  endTime: string;
  category?: string;
  tutor: { user: { name: string; email: string; avatar?: string; hourlyRate?: number } };
};

const statusConfig: Record<BookingStatus, { label: string; icon: React.ReactNode; variant: any }> = {
  CONFIRMED: { label: "Confirmed", icon: <CheckCircle className="h-3 w-3" />, variant: "default" },
  PENDING: { label: "Pending", icon: <Clock4 className="h-3 w-3" />, variant: "secondary" },
  COMPLETED: { label: "Completed", icon: <CalendarCheck className="h-3 w-3" />, variant: "outline" },
  CANCELLED: { label: "Cancelled", icon: <X className="h-3 w-3" />, variant: "destructive" },
};

export default function StudentBookingsClient({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(initialBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"date" | "rate">("date");
  const [refreshing, setRefreshing] = useState(false);

  /* REVIEW STATE */
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  const safeDate = (v: string) => format(new Date(v), "EEE, MMM d, yyyy");
  const formatTime = (v: string) => format(new Date(v), "h:mm a");
  const initials = (n: string) => n.split(" ").map(i => i[0]).join("").slice(0, 2).toUpperCase();

  /* REFRESH BOOKINGS */
  const fetchBookings = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`/student/my-bookings`, { credentials: "include" });
      const json = await res.json();
      if (res.ok) setBookings(json.data);
    } finally {
      setRefreshing(false);
    }
  };

  /* FILTERING & SORTING */
  useEffect(() => {
    let result = [...bookings];
    if (activeFilter !== "all") result = result.filter(b => b.status === activeFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        b => b.tutor.user.name.toLowerCase().includes(q) || b.category?.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) =>
      sortBy === "date" ? +new Date(b.startTime) - +new Date(a.startTime) : (a.tutor.user.hourlyRate || 0) - (b.tutor.user.hourlyRate || 0)
    );
    setFilteredBookings(result);
  }, [bookings, searchQuery, activeFilter, sortBy]);

  /* SUBMIT REVIEW */
  const submitReview = async () => {
  if (!selectedBooking) return;
  setReviewLoading(true);

  try {
    // Call the Server Action
    const res = await submitReviewAction(selectedBooking.id, rating, comment);

    if (!res.success) {
      toast.error(res.message);
      if (res.duplicate) setReviewOpen(false);
      return;
    }

    toast.success("Thank you for your feedback!");
    setReviewOpen(false);
    fetchBookings();
  } catch (err: any) {
    toast.error("Something went wrong");
  } finally {
    setReviewLoading(false);
  }
};

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 bg-background text-foreground transition-colors duration-300">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <Button variant="outline" onClick={fetchBookings} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <Input
          placeholder="Search tutor or subject..."
          className="md:max-w-sm bg-card border-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-wrap gap-3">
          <Select value={sortBy} onValueChange={v => setSortBy(v as any)}>
            <SelectTrigger className="w-[140px] bg-card border-input"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Latest Date</SelectItem>
              <SelectItem value="rate">Hourly Rate</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={activeFilter} onValueChange={setActiveFilter}>
            <TabsList className="bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
              <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBookings.map(b => {
          const config = statusConfig[b.status];
          return (
            <Card key={b.id} className="relative overflow-hidden group hover:shadow-md transition-all bg-card border-border">
              <div className={`absolute top-0 left-0 w-1 h-full ${b.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
              <CardHeader className="pb-2">
                <Badge variant={config.variant} className="w-fit mb-2">
                  {config.icon} <span className="ml-1">{config.label}</span>
                </Badge>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-secondary-foreground">
                    {initials(b.tutor.user.name)}
                  </div>
                  <div>
                    <CardTitle className="text-base truncate">{b.tutor.user.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{b.category || "General Tutoring"}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2"><Calendar className="h-3 w-3" /> {safeDate(b.startTime)}</div>
                  <div className="flex items-center gap-2"><Clock className="h-3 w-3" /> {formatTime(b.startTime)} - {formatTime(b.endTime)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm text-foreground"><DollarSign className="inline h-3 w-3" />{b.tutor.user?.hourlyRate}/hr</span>
                  {b.status === "COMPLETED" && (
                    <Button size="sm" variant="secondary" onClick={() => { setSelectedBooking(b); setReviewOpen(true); }}>
                      Review
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* REVIEW MODAL */}
      {reviewOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200 bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Rate your session</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setReviewOpen(false)}><X className="h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-2 py-2">
                {[1,2,3,4,5].map(star => (
                  <Star
                    key={star}
                    className={`h-8 w-8 cursor-pointer transition-colors ${rating >= star ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <textarea
                placeholder="Share your experience with the tutor..."
                className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-primary outline-none"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <Button className="w-full" onClick={submitReview} disabled={reviewLoading}>
                {reviewLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Review"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
