"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Loader2 } from "lucide-react";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

export default function BecomeTutorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;

  const becomeTutor = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/user/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role: "TUTOR" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to become tutor");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <Card className="border shadow-md">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
            <GraduationCap className="h-7 w-7 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Become a Tutor</CardTitle>
          <p className="text-muted-foreground">
            Share your knowledge, earn money, and help students grow.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✔ Create your tutor profile</li>
            <li>✔ Set your own schedule & pricing</li>
            <li>✔ Teach students worldwide</li>
          </ul>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={becomeTutor}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Become a Tutor"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
