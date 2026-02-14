"use client";

import { useState, useMemo, useTransition } from "react";
import {
  Loader2, CalendarCheck, Clock, Calendar,
  CheckCircle2, AlertCircle, CalendarDays, BarChart3,
  DollarSign, MoreVertical, RefreshCw, Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateBookingStatusAction } from "./serverAction";

/* Types declaration */
type Booking = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  startTime: string;
  endTime: string;
  sessionDate: string;
  totalPrice?: number;
  student: { name: string; email: string; avatar?: string; };
};

const statusConfig = {
  CONFIRMED: { label: "Confirmed", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", icon: CheckCircle2 },
  PENDING: { label: "Pending", text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", icon: Clock },
  COMPLETED: { label: "Completed", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10", icon: CalendarCheck },
  CANCELLED: { label: "Cancelled", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10", icon: AlertCircle },
};

export default function TutorBookingsClient({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isPending, startTransition] = useTransition();
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Logic: Memoized Stats
  const stats = useMemo(() => {
    const completed = bookings.filter(b => b.status === "COMPLETED");
    const upcoming = bookings.filter(b => ["CONFIRMED", "PENDING"].includes(b.status));
    const earnings = completed.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    
    return {
      totalEarnings: earnings,
      upcomingSessions: upcoming.length,
      completedSessions: completed.length,
      avgRating: 0
    };
  }, [bookings]);

  // Logic: Filtering
  const filteredBookings = useMemo(() => {
    return statusFilter === "all" ? bookings : bookings.filter(b => b.status === statusFilter);
  }, [statusFilter, bookings]);

  // Logic: Mark Completed via Server Action
  const handleMarkComplete = (bookingId: string) => {
    setActionLoadingId(bookingId);

    startTransition(async () => {
      const result = await updateBookingStatusAction(bookingId);

      if (result.success) {
        toast.success("Session marked as completed");
        // Optimistic UI update
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: "COMPLETED" } : b))
        );
      } else {
        toast.error(result.message);
      }
      setActionLoadingId(null);
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Tutor Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage your earnings and upcoming student sessions.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()} // Simple refresh since we use SSR
          className="rounded-xl border-zinc-200 dark:border-zinc-800"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync Data
        </Button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Earnings" value={`৳${stats.totalEarnings}`} icon={DollarSign} color="text-emerald-500" />
        <StatCard title="Upcoming" value={stats.upcomingSessions} icon={CalendarDays} color="text-indigo-500" />
        <StatCard title="Completed" value={stats.completedSessions} icon={CheckCircle2} color="text-blue-500" />
        <StatCard title="Rating" value={`${stats.avgRating}/5.0`} icon={BarChart3} color="text-amber-500" />
      </div>

      {/* FILTER BAR */}
      <div className="flex items-center justify-between pt-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Recent Activity</h3>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-zinc-400" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm px-3 py-2 font-bold outline-none ring-offset-background focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* BOOKINGS LIST */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl opacity-50">
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <p className="font-medium">No sessions found.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <BookingRow 
              key={booking.id} 
              booking={booking} 
              onComplete={handleMarkComplete} 
              isLoading={actionLoadingId === booking.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

/*  UI SUB-COMPONENTS  */

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden group hover:border-indigo-500/50 transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">{title}</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1">{value}</p>
          </div>
          <div className={cn("p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:scale-110 transition-transform", color)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BookingRow({ booking, onComplete, isLoading }: any) {
  const config = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.PENDING;
  const StatusIcon = config.icon;

  const safeFormat = (date: string, pattern: string) => {
    try { return format(new Date(date), pattern); } catch { return "N/A"; }
  };

  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-3xl hover:shadow-xl transition-all group">
      <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Student Info */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-indigo-600 dark:text-indigo-400 text-xl border border-zinc-200 dark:border-zinc-700">
            {booking.student.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">{booking.student.name}</h4>
              <Badge variant="outline" className={cn("border-none px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter", config.bg, config.text)}>
                <StatusIcon className="h-3 w-3 mr-1" /> {config.label}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {safeFormat(booking.startTime, "EEE, MMM d")}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {safeFormat(booking.startTime, "h:mm a")} - {safeFormat(booking.endTime, "h:mm a")}</span>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0">
          <div className="text-left md:text-right">
            <p className="text-[10px] font-bold uppercase text-zinc-400">Net Fee</p>
            <p className="font-black text-indigo-600 dark:text-indigo-400 text-lg">৳{booking.totalPrice?.toFixed(0)}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {(booking.status === "CONFIRMED" || booking.status === "PENDING") && (
              <Button 
                size="sm" 
                onClick={() => onComplete(booking.id)} 
                disabled={isLoading}
                className="rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-colors"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Mark Complete"}
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}