"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Calendar, BookOpen, Star, Mail, ChevronRight, CheckCircle, Clock, XCircle, Sparkles, Trophy, Moon, Sun, MoreVertical, Filter } from "lucide-react";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type StudentProfile = {
  id: string;
  name: string;
  email: string;
  bookings: any[];
  reviews: any[];
};

export default function StudentProfilePage() {
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [data, setData] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAllBookings, setShowAllBookings] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/student/my-profile`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [API]);

  const activeBookings = data?.bookings.filter(b => b.status === "CONFIRMED").length || 0;
  const totalBookings = data?.bookings.length || 0;
  const completionRate = totalBookings > 0 ? Math.round((data?.reviews.length || 0) / totalBookings * 100) : 0;
  const displayedBookings = showAllBookings ? data?.bookings || [] : data?.bookings.slice(0, 5) || [];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] sm:min-h-[70vh] space-y-4 px-4">
        <div className="relative">
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-purple-100 dark:border-purple-900/30 animate-pulse"></div>
          <Loader2 className="absolute inset-0 m-auto h-12 w-12 sm:h-16 sm:w-16 animate-spin text-purple-600 dark:text-purple-400" />
        </div>
        <p className="text-base sm:text-lg text-muted-foreground text-center">Loading your profile...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-16 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-3 sm:mb-4">
          <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Profile Unavailable</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2">{error || "Unable to load profile information"}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg transition-colors text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
      {/* Header with Theme Toggle */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 ">Student Profile</h1>
          <p className="text-sm text-muted-foreground">Overview of your learning journey</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="sm:hidden h-9 w-9">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {mounted && theme === "dark" ? (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowAllBookings(!showAllBookings)}>
                <Filter className="mr-2 h-4 w-4" />
                {showAllBookings ? "Show Less" : "Show All"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Desktop Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden sm:flex p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 dark:from-purple-800 dark:via-indigo-800 dark:to-purple-900">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 dark:bg-white/5 rounded-full -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 dark:bg-white/5 rounded-full translate-y-6 sm:translate-y-12 -translate-x-6 sm:-translate-x-12"></div>
        
        <CardContent className="p-4 sm:p-6 md:p-8 relative z-10">
          <div className="flex flex-col xs:flex-row xs:items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative flex-shrink-0">
                <div className="p-3 sm:p-4 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm border-2 border-white/30 dark:border-white/20">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-green-400 dark:bg-green-500 rounded-full border-2 border-white dark:border-purple-900"></div>
              </div>
              <div className="space-y-1 min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white truncate">{data.name}</h1>
                <div className="flex items-center gap-2 text-white/90 dark:text-white/80">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <p className="text-xs sm:text-sm md:text-base truncate">{data.email}</p>
                </div>
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-2 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 dark:border-white/20">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">Student Profile</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Total Bookings"
          value={totalBookings}
          color="bg-blue-500 dark:bg-blue-600"
          trend={totalBookings > 5 ? "+12%" : undefined}
          className="h-full"
        />
        <StatCard
          icon={<Star className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Reviews Given"
          value={data.reviews.length}
          color="bg-amber-500 dark:bg-amber-600"
          trend={data.reviews.length > 3 ? "+8%" : undefined}
          className="h-full"
        />
        <StatCard
          icon={<BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Active Sessions"
          value={activeBookings}
          color="bg-green-500 dark:bg-green-600"
          className="h-full"
        />
        <StatCard
          icon={<Trophy className="h-4 w-4 sm:h-5 sm:w-5" />}
          label="Completion Rate"
          value={`${completionRate}%`}
          color="bg-purple-500 dark:bg-purple-600"
          progress={completionRate}
          className="h-full"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Recent Bookings Card */}
        <Card className="lg:col-span-2 shadow-sm sm:shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
              <CardTitle className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                Recent Bookings
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700">
                  {data.bookings.length} total
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex text-xs"
                  onClick={() => setShowAllBookings(!showAllBookings)}
                >
                  <Filter className="h-3 w-3 mr-1" />
                  {showAllBookings ? "Show Less" : "Show All"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            {data.bookings.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-3">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1 text-sm sm:text-base">No bookings yet</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Start your learning journey today!</p>
                <Button className="mt-4 text-sm">Find a Tutor</Button>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {displayedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-100 dark:border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 hover:shadow-sm dark:hover:shadow-gray-900/50 transition-all duration-200 cursor-pointer bg-white dark:bg-gray-900"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start sm:items-center gap-3 mb-2 flex-col xs:flex-row">
                        <div className="flex items-center gap-3 w-full xs:w-auto">
                          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center">
                            <User className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm sm:text-base">
                              {booking.tutor?.user?.name || "Tutor Name"}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              {booking.tutor?.category?.name || "No category"}
                            </p>
                          </div>
                        </div>
                        <div className="w-full xs:w-auto xs:ml-auto">
                          <Badge
                            className={cn(
                              "text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit",
                              booking.status === "CONFIRMED" && 
                                "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-0",
                              booking.status === "PENDING" && 
                                "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-0",
                              booking.status === "CANCELLED" && 
                                "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-0"
                            )}
                          >
                            <div className="flex items-center gap-1">
                              {booking.status === "CONFIRMED" && <CheckCircle className="h-2 w-2 sm:h-3 sm:w-3" />}
                              {booking.status === "PENDING" && <Clock className="h-2 w-2 sm:h-3 sm:w-3" />}
                              {booking.status === "CANCELLED" && <XCircle className="h-2 w-2 sm:h-3 sm:w-3" />}
                              <span className="hidden xs:inline">{booking.status}</span>
                              <span className="xs:hidden">{booking.status.charAt(0)}</span>
                            </div>
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
                          {booking.startTime}
                        </span>
                        <ChevronRight className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0 hidden sm:block" />
                        <span className="hidden sm:block">{booking.endTime}</span>
                        <span className="sm:hidden flex items-center gap-1">
                          <span className="text-muted-foreground">to</span>
                          {booking.endTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t border-gray-100 dark:border-gray-800 sm:border-t-0">
                      <div className="text-xs text-muted-foreground sm:hidden">
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </div>
                  </div>
                ))}
                
                {data.bookings.length > 5 && (
                  <div className="pt-2 sm:pt-4">
                    <button 
                      onClick={() => setShowAllBookings(!showAllBookings)}
                      className="w-full py-2 text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                    >
                      {showAllBookings ? "Show Less" : `View all ${data.bookings.length} bookings`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Summary Card */}
        <Card className="shadow-sm sm:shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 h-fit">
          <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-6">
            <CardTitle className="text-base sm:text-lg md:text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
              Profile Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-muted-foreground">Member Since</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-muted-foreground">Learning Hours</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">{totalBookings * 1.5}h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-muted-foreground">Favorite Subject</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">Mathematics</span>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">Learning Progress</span>
                  <span className="text-xs text-purple-600 dark:text-purple-400">{completionRate}%</span>
                </div>
                <Progress 
                  value={completionRate} 
                  className="h-1.5 sm:h-2 bg-gray-100 dark:bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500 dark:[&>div]:from-purple-400 dark:[&>div]:to-indigo-400" 
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {completionRate > 80 ? "Excellent progress! Keep it up!" :
                   completionRate > 50 ? "Good pace! Continue learning!" :
                   "Start reviewing your sessions to track progress!"}
                </p>
              </div>
              <button className="w-full mt-3 sm:mt-4 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-600 dark:hover:to-indigo-600 transition-all shadow-sm hover:shadow dark:shadow-gray-900/50 text-sm sm:text-base">
                View Full Report
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-3 sm:hidden z-50">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Bookings
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <Star className="h-4 w-4 mr-2" />
            Reviews
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- */
/* Enhanced Responsive Stat Card Component */
/* ----------------------------- */

function StatCard({
  icon,
  label,
  value,
  color,
  trend,
  progress,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color?: string;
  trend?: string;
  progress?: number;
  className?: string;
}) {
  return (
    <Card className={cn(
      "group hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300",
      "border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden",
      "h-full min-h-[120px] sm:min-h-[140px]",
      className
    )}>
      <CardContent className="p-3 sm:p-4 md:p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <div className={cn(
            "p-2 sm:p-3 rounded-lg sm:rounded-xl text-white",
            "transition-transform group-hover:scale-105",
            color || "bg-purple-500 dark:bg-purple-600"
          )}>
            {icon}
          </div>
          {trend && (
            <Badge 
              variant="outline" 
              className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 hidden sm:flex"
            >
              {trend}
            </Badge>
          )}
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div className="mb-2 sm:mb-3">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 mt-0.5 sm:mt-1 line-clamp-2">
              {label}
            </div>
          </div>
          
          {trend && (
            <div className="sm:hidden text-xs text-green-600 dark:text-green-400 font-medium">
              {trend}
            </div>
          )}
          
          {progress !== undefined && (
            <div className="mt-2 sm:mt-3">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 sm:h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 dark:group-hover:opacity-5 transition-opacity" />
      </CardContent>
    </Card>
  );
}