"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { 
  Calendar, Clock, User, GraduationCap, 
  Search, Filter, LayoutGrid, List, MoreHorizontal 
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

type Booking = {
  id: string;
  status: BookingStatus;
  startTime: string;
  endTime: string;
  subject?: string;
  student: { name: string; email: string };
  tutor: { user: { name: string; email: string } };
};

const statusStyles: Record<BookingStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  CONFIRMED: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  COMPLETED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  CANCELLED: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export default function AdminBookingsClient({ initialBookings }: { initialBookings: Booking[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = useMemo(() => {
    return initialBookings.filter((b) =>
      b.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tutor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialBookings]);

  const safeFormat = (date: string, pattern: string) => {
    try {
      return format(new Date(date), pattern);
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50">Session Logs</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm italic">Monitoring {initialBookings.length} platform interactions.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input 
              placeholder="Search student, tutor or subject..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-indigo-500"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl border-zinc-200 dark:border-zinc-800">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bookings Display */}
      <div className="grid gap-4">
        {filteredBookings.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed rounded-3xl border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">No sessions match your search criteria.</p>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <Card key={b.id} className="group overflow-hidden rounded-3xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 flex flex-col md:flex-row">
                {/* Status Sidebar */}
                <div className={cn("w-full md:w-2 transition-all duration-300 group-hover:md:w-4", 
                  b.status === "COMPLETED" ? "bg-emerald-500" : 
                  b.status === "CANCELLED" ? "bg-rose-500" : 
                  b.status === "PENDING" ? "bg-amber-500" : "bg-indigo-500"
                )} />
                
                <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-4 items-center gap-6">
                  {/* Participants */}
                  <div className="md:col-span-2 flex items-center gap-6">
                    <div className="flex -space-x-3">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-indigo-600 font-bold">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-zinc-600 font-bold">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-zinc-400">Student</p>
                        <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{b.student.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-zinc-400">Tutor</p>
                        <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{b.tutor.user.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Timing & Details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-medium">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{safeFormat(b.startTime, "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs">{safeFormat(b.startTime, "h:mm a")} - {safeFormat(b.endTime, "h:mm a")}</span>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <Badge variant="outline" className={cn("px-3 py-1 rounded-full border-none font-bold text-[10px] uppercase tracking-wider", statusStyles[b.status])}>
                      {b.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <MoreHorizontal className="h-5 w-5 text-zinc-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}