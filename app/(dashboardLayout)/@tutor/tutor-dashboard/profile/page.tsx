"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { env } from "@/env";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  GraduationCap,
  Loader2,
  Star,
  UserCheck,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Category = {
  id: string;
  name: string;
};

const API = env.NEXT_PUBLIC_FRONTEND_API_URL;

export default function TutorProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [form, setForm] = useState({
    bio: "",
    hourlyRate: "",
    experience: "",
    categoryId: "",
  });

  //  Dark mode watcher 
  useEffect(() => {
    const check = () =>
      setDarkMode(document.documentElement.classList.contains("dark"));

    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Load categories for select dropdown
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/categories`);
        const json = await res.json();

        if (json?.success && Array.isArray(json.data)) {
          setCategories(json.data);
        } else {
          setCategories([]);
        }
      } catch {
        setCategories([]);
      }
    };

    load();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  // Submit  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (
      !form.bio.trim() ||
      !form.hourlyRate ||
      !form.experience ||
      !form.categoryId
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (+form.hourlyRate <= 0 || +form.experience < 0) {
      setError("Invalid hourly rate or experience");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/tutor/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bio: form.bio.trim(),
          hourlyRate: +form.hourlyRate,
          experience: +form.experience,
          categoryId: form.categoryId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Profile saved successfully! Redirecting...");
      setTimeout(() => router.push("/tutor-dashboard"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300 bg-clip-text text-transparent mb-3">
            Complete Your Tutor Profile
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Set up your profile to start connecting with students
          </p>
        </div>

        <Card
          className={cn(
            "border-2 shadow-xl",
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-100",
          )}
        >
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <UserCheck className="h-5 w-5 text-purple-600" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Fill in your details to create an attractive tutor profile
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 sm:space-y-6 pt-4 sm:pt-6">
              {/* Bio */}
              <div className="space-y-2">
                <Label className="font-semibold flex items-center gap-2">
                  About You <Badge variant="outline">Required</Badge>
                </Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  maxLength={500}
                  placeholder="Tell students about yourself"
                  className="min-h-[130px]"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  {form.bio.length}/500 characters
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label className="font-semibold flex items-center gap-1">
                    <span className="text-xl mb-1">৳</span> 
                    Hourly Rate
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={form.hourlyRate}
                    onChange={(e) =>
                      handleChange("hourlyRate", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2 mt-0 md:mt-4 ">
                  <Label className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Experience (Years)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.experience}
                    onChange={(e) =>
                      handleChange("experience", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Teaching Category
                </Label>
                <Select
                  value={form.categoryId}
                  onValueChange={(v) => handleChange("categoryId", v)}
                  disabled={!categories.length}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        Loading categories...
                      </div>
                    ) : (
                      categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Alerts */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
