"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, CalendarCheck, User, Clock, Mail, Calendar,
  CheckCircle2, AlertCircle, CalendarDays, BarChart3,
  TrendingUp, DollarSign, MoreVertical, RefreshCw,
  Filter, ChevronDown, Eye,
} from "lucide-react";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

/* --- Types --- */
type Booking = {
  id: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  startTime: string;
  endTime: string;
  sessionDate: string;
  totalPrice?: number;
  subject?: string;
  student: { name: string; email: string; avatar?: string; };
  notes?: string;
};

const statusConfig = {
  CONFIRMED: { label: "Confirmed", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", icon: CheckCircle2 },
  PENDING: { label: "Pending", text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", icon: Clock },
  COMPLETED: { label: "Completed", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10", icon: CalendarCheck },
  CANCELLED: { label: "Cancelled", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10", icon: AlertCircle },
};

export default function TutorBookingsClient({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;

  // Memoized Stats
  const stats = useMemo(() => {
    const completed = bookings.filter(b => b.status === "COMPLETED");
    const upcoming = bookings.filter(b => b.status === "CONFIRMED" || b.status === "PENDING");
    const earnings = completed.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    
    return {
      totalEarnings: earnings,
      upcomingSessions: upcoming.length,
      completedSessions: completed.length,
      avgRating: 4.9 // Placeholder or from API
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return statusFilter === "all" ? bookings : bookings.filter(b => b.status === statusFilter);
  }, [statusFilter, bookings]);

  const fetchBookings = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`${API}/booking/tutor-bookings`, { credentials: "include" });
      const json = await res.json();
      if (res.ok) setBookings(json.data || []);
    } catch (err) {
      toast.error("Failed to refresh bookings");
    } finally {
      setRefreshing(false);
    }
  };

  const markCompleted = async (bookingId: string) => {
    setActionLoading(bookingId);
    try {
      const res = await fetch(`${API}/booking/complete/${bookingId}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Update failed");
      
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "COMPLETED" } : b));
      toast.success("Session marked as completed");
    } catch (err) {
      toast.error("Could not update status");
    } finally {
      setActionLoading(null);
    }
  };

  const safeDate = (v: string) => {
    try { return format(new Date(v), "EEE, MMM d"); } 
    catch { return "No Date"; }
  };

  const formatTime = (v: string) => {
    try { return format(new Date(v), "h:mm a"); } 
    catch { return "--:--"; }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 bg-zinc-50 dark:bg-[#09090b] min-h-screen transition-colors">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Tutor Dashboard</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Track your performance and manage upcoming student sessions.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={fetchBookings} 
          disabled={refreshing}
          className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
          Refresh Data
        </Button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Earnings" value={`$${stats.totalEarnings.toLocaleString()}`} icon={DollarSign} color="text-emerald-500" />
        <StatCard title="Upcoming" value={stats.upcomingSessions} icon={CalendarDays} color="text-indigo-500" />
        <StatCard title="Completed" value={stats.completedSessions} icon={CheckCircle2} color="text-blue-500" />
        <StatCard title="Avg Rating" value={`${stats.avgRating}/5.0`} icon={BarChart3} color="text-amber-500" />
      </div>

      {/* LIST HEADER & FILTER */}
      <div className="flex items-center justify-between pt-4">
        <h3 className="text-xl font-semibold dark:text-zinc-100">Recent Activity</h3>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-zinc-400" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md text-sm px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none"
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
          <div className="text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl opacity-50">
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <p>No sessions found matching this filter.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <BookingRow 
              key={booking.id} 
              booking={booking} 
              onComplete={markCompleted} 
              isLoading={actionLoading === booking.id}
              safeDate={safeDate}
              formatTime={formatTime}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* --- Sub-Components for Cleanliness --- */

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden relative group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{value}</p>
          </div>
          <div className={cn("p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 group-hover:scale-110 transition-transform", color)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BookingRow({ booking, onComplete, isLoading, safeDate, formatTime }: any) {
  const config = statusConfig[booking.status as keyof typeof statusConfig];
  const StatusIcon = config.icon;

  return (
    <Card className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow group">
      <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
            {booking.student.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">{booking.student.name}</h4>
              <Badge variant="outline" className={cn("border-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", config.bg, config.text)}>
                <StatusIcon className="h-3 w-3 mr-1" /> {config.label}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {safeDate(booking.startTime)}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right mr-4">
            <p className="text-xs text-zinc-400">Fee</p>
            <p className="font-bold text-indigo-600 dark:text-indigo-400">${booking.totalPrice?.toFixed(2)}</p>
          </div>
          
          {(booking.status === "CONFIRMED" || booking.status === "PENDING") && (
            <Button 
              size="sm" 
              onClick={() => onComplete(booking.id)} 
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Complete"}
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}