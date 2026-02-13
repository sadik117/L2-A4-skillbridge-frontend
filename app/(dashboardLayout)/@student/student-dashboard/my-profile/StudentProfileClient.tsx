"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User, Calendar, BookOpen, Star, Mail, ChevronRight,
  CheckCircle, Clock, XCircle, Sparkles, Trophy, Moon, Sun,
  MoreVertical, Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

type StudentProfile = {
  id: string;
  name: string;
  email: string;
  bookings: any[];
  reviews: any[];
};

export default function StudentProfileClient({ initialData }: { initialData: StudentProfile }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showAllBookings, setShowAllBookings] = useState(false);

  // Avoid hydration mismatch for theme icons
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeBookings = initialData.bookings.filter((b) => b.status === "CONFIRMED").length;
  const totalBookings = initialData.bookings.length;
  const completionRate = totalBookings > 0 
    ? Math.round((initialData.reviews.length / totalBookings) * 100) 
    : 0;
  
  const displayedBookings = showAllBookings
    ? initialData.bookings
    : initialData.bookings.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Student Profile</h1>
          <p className="text-muted-foreground">Overview of your learning journey</p>
        </div>
        
        {mounted && (
          <Button 
          className="bg-zinc-800"
            variant="outline" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
      </div>

      {/* Profile Banner */}
      <Card className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white border-0 shadow-xl">
        <CardContent className="p-8 flex items-center gap-6">
          <div className="p-4 rounded-full bg-white/20 backdrop-blur-md">
            <User className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{initialData.name}</h2>
            <div className="flex items-center gap-2 opacity-90">
              <Mail className="h-4 w-4" />
              <span>{initialData.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        <StatItem icon={<Calendar />} label="Total Bookings" value={totalBookings} color="bg-blue-500" />
        <StatItem icon={<Star />} label="Reviews" value={initialData.reviews.length} color="bg-amber-500" />
        <StatItem icon={<BookOpen />} label="Active Sessions" value={activeBookings} color="bg-green-500" />
        <StatItem icon={<Trophy />} label="Completion" value={`${completionRate}%`} color="bg-purple-500" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Bookings List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" /> Recent Bookings
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowAllBookings(!showAllBookings)}>
              {showAllBookings ? "Show Less" : "View All"}
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {displayedBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{booking.tutor?.user?.name || "Tutor"}</h4>
                      <p className="text-sm text-muted-foreground">{booking.startTime} - {booking.endTime}</p>
                    </div>
                  </div>
                  <Badge variant={booking.status === "CONFIRMED" ? "default" : "secondary"}>
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Progress */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Progress Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Learning Hours</span>
                <span className="font-bold">{totalBookings * 1.5}h</span>
              </div>
              <Progress value={completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground pt-2">
                {completionRate > 50 ? "You're doing great!" : "Keep up the momentum!"}
              </p>
            </div>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">View Detailed Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatItem({ icon, label, value, color }: any) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
        <div className={cn("p-3 rounded-xl text-white", color)}>{icon}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
      </CardContent>
    </Card>
  );
}