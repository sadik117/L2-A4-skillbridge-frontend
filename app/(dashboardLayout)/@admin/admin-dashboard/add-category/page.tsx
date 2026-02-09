"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, Loader2, PlusCircle, ArrowLeft, Sparkles, Hash } from "lucide-react";
import { env } from "@/env";
import { cn } from "@/lib/utils";

export default function CreateCategoryPage() {
  const router = useRouter();
  const API = env.NEXT_PUBLIC_FRONTEND_API_URL;

  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => setDarkMode(document.documentElement.classList.contains("dark"));
    checkDarkMode();
    const observer = new MutationObserver(() => checkDarkMode());
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Optional: auto-generate slug from name
  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !slug.trim()) {
      setError("Please enter both category name and slug");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/categories`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create category");

      setSuccess(`"${name}" has been added successfully.`);
      setName("");
      setSlug("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(
      "min-h-[80vh] flex items-center justify-center p-4",
      darkMode ? "bg-gray-900/90" : "bg-gray-50"
    )}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Card className={cn("border-2 shadow-lg relative z-10", darkMode ? "bg-gray-900/80 border-gray-800" : "bg-white/80 border-white/20")}>
          <CardHeader className="space-y-1 pt-8">
            <div className={cn(
              "flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full w-fit",
              darkMode ? "bg-purple-900/30 text-purple-300" : "bg-purple-100 text-purple-700"
            )}>
              <PlusCircle className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Admin Panel</span>
            </div>
            <CardTitle className={cn("text-2xl md:text-3xl font-bold tracking-tight", darkMode ? "text-gray-100" : "text-gray-900")}>
              Create New Category
            </CardTitle>
            <CardDescription className={cn(darkMode ? "text-gray-400" : "text-gray-600")}>
              Add a new topic area for your tutors and students.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Category Name */}
              <div className="space-y-2">
                <Label className={cn("flex items-center gap-2 text-sm font-semibold", darkMode ? "text-gray-300" : "text-gray-700")}>
                  <Sparkles className={cn("h-4 w-4", darkMode ? "text-purple-400" : "text-purple-600")} />
                  Category Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Web Development"
                  className={cn(
                    "h-12 border-2 text-lg",
                    darkMode 
                      ? "bg-gray-800/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500/20 text-gray-100" 
                      : "bg-white/50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-gray-900"
                  )}
                  autoFocus
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label className={cn("flex items-center gap-2 text-sm font-semibold", darkMode ? "text-gray-300" : "text-gray-700")}>
                  <Hash className={cn("h-4 w-4", darkMode ? "text-blue-400" : "text-blue-600")} />
                  Slug
                </Label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g., web-development"
                  className={cn(
                    "h-12 border-2 text-lg",
                    darkMode 
                      ? "bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 text-gray-100" 
                      : "bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-gray-900"
                  )}
                />
                <p className="text-xs opacity-70">Use lowercase letters, numbers, and hyphens only.</p>
              </div>

              {/* Feedback */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <Alert variant="destructive" className={cn(darkMode ? "bg-red-900/20 border-red-800/50 text-red-300" : "bg-red-50 border-red-200 text-red-700")}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="font-bold">Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <Alert className={cn(darkMode ? "bg-green-900/20 border-green-800/50 text-green-300" : "bg-green-50 border-green-200 text-green-700")}>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle className="font-bold">Success</AlertTitle>
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-3 p-6 mt-2 border-t">
              <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => router.back()} disabled={loading}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
              <Button type="submit" className="w-full sm:flex-1" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</> : <><PlusCircle className="mr-2 h-4 w-4" />Create Category</>}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
