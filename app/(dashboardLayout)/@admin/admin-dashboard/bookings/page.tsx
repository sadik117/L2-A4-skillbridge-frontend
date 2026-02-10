"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { env } from "@/env";

type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

type Booking = {
  id: string;
  status: BookingStatus;
  startTime: string;
  endTime: string;
  subject?: string;

  student: {
    name: string;
    email: string;
  };

  tutor: {
    user: {
      name: string;
      email: string;
    };
  };
};

const statusVariant: Record<BookingStatus, any> = {
  PENDING: "secondary",
  CONFIRMED: "default",
  COMPLETED: "success",
  CANCELLED: "destructive",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${env.NEXT_PUBLIC_FRONTEND_API_URL}/booking/all-bookings`,
        { credentials: "include" }
      );

      const data = await res.json();
      setBookings(data.data || []);
    } catch (err) {
      console.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


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


  if (loading) {
    return (
      <div className="grid gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">All Bookings</h1>
        <p className="text-sm text-gray-900">
          Platform session overview
        </p>
      </div>

      {bookings.length === 0 && (
        <p className="text-sm text-muted-foreground">No bookings found.</p>
      )}

      <div className="grid gap-4">
        {bookings.map((b) => (
          <Card key={b.id} className="p-4 flex flex-col gap-4">
            {/* top */}
            <div className="flex items-center justify-between">
              <Badge variant={statusVariant[b.status]}>{b.status}</Badge>
              <span className="text-sm text-muted-foreground">
                {safeDate(b.startTime)}
              </span>
            </div>

            {/* info */}
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-medium">Student</p>
                <p>{b.student.name}</p>
                <p className="text-muted-foreground">{b.student.email}</p>
              </div>

              <div>
                <p className="font-medium">Tutor</p>
                <p>{b.tutor.user.name}</p>
                <p className="text-muted-foreground">{b.tutor.user.email}</p>
              </div>
            </div>

            {/* bottom */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <p>
                <span className="font-medium">Time:</span>{" "}
                {formatTime(b.startTime)} – {formatTime(b.endTime)}
              </p>

              <p>
                <span className="font-medium">Subject:</span>{" "}
                {b.subject || "General"}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
