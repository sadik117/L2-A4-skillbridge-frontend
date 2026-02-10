"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { env } from "@/env";

type AdminStats = {
  totalUsers: number;
  totalStudents: number;
  totalTutors: number;
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalReviews: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${env.NEXT_PUBLIC_FRONTEND_API_URL}/admin/dashboard-stats`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch admin stats");
      setStats(data.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats?.totalUsers}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats?.totalStudents}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Tutors</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats?.totalTutors}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats?.totalBookings}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed Bookings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats?.completedBookings}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Reviews</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats?.totalReviews}</CardContent>
        </Card>
      </div>
    </div>
  );
}
