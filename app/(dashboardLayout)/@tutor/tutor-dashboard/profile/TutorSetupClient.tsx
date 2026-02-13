"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UserCheck, Clock, GraduationCap, ChevronLeft } from "lucide-react";
import { submitTutorProfile } from "./serverFormAction";

export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

interface Props {
  initialCategories: Category[];
}

export default function TutorSetupClient({ initialCategories }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    bio: "",
    hourlyRate: "",
    experience: "",
    categoryId: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!form.bio.trim() || !form.hourlyRate || !form.experience || !form.categoryId) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      await submitTutorProfile({
        bio: form.bio.trim(),
        hourlyRate: Number(form.hourlyRate),
        experience: Number(form.experience),
        categoryId: form.categoryId,
      });

      toast.success("Profile saved! Welcome aboard.");
      router.push("/tutor-dashboard");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="group text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>

        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
          <CardHeader className="space-y-1 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <UserCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle className="text-2xl font-bold dark:text-zinc-50">Tutor Profile Setup</CardTitle>
            </div>
            <CardDescription className="dark:text-zinc-400">This information helps students find and trust you.</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              {/* Bio Section */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="font-semibold dark:text-zinc-200">About You</Label>
                  <span className="text-xs text-zinc-400">{form.bio.length}/500</span>
                </div>
                <Textarea
                  value={form.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  maxLength={500}
                  placeholder="Describe your teaching style and expertise..."
                  className="min-h-[120px] bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hourly Rate */}
                <div className="space-y-2">
                  <Label className="font-semibold dark:text-zinc-200 flex items-center gap-2">Hourly Rate (৳)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">৳</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                      value={form.hourlyRate}
                      onChange={(e) => handleChange("hourlyRate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <Label className="font-semibold dark:text-zinc-200 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Experience (Years)
                  </Label>
                  <Input
                    type="number"
                    placeholder="E.g. 3"
                    className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                    value={form.experience}
                    onChange={(e) => handleChange("experience", e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="font-semibold dark:text-zinc-200 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Teaching Category
                </Label>
                <Select value={form.categoryId} onValueChange={(v) => handleChange("categoryId", v)}>
                  <SelectTrigger className="bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-zinc-800 border-zinc-700">
                    {initialCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>

            <CardFooter className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-6">
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Finalizing Profile...
                  </div>
                ) : (
                  "Create Professional Profile"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
