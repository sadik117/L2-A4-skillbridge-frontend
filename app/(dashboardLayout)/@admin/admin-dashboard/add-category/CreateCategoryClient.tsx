"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, ArrowLeft, Loader2, Sparkles, Hash, AlertCircle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createCategoryAction } from "./serverAction";

export default function CreateCategoryClient() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Auto-generate slug from name
  useEffect(() => {
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(generatedSlug);
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !slug.trim()) {
      setError("Please enter both category name and slug");
      return;
    }

    startTransition(async () => {
      const result = await createCategoryAction({ name, slug });

      if (result.success) {
        setSuccess(`"${name}" has been added successfully.`);
        setName("");
        setSlug("");
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="border-2 shadow-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pt-8">
            <div className="flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full w-fit bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <PlusCircle className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Management</span>
            </div>
            <CardTitle className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              New Category
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">
              Define a new subject area for your educational ecosystem.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  Category Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Quantum Physics"
                  className="h-12 border-2 rounded-2xl text-lg bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 transition-all"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <Hash className="h-4 w-4 text-emerald-500" />
                  URL Slug
                </Label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="quantum-physics"
                  className="h-12 border-2 rounded-2xl font-mono text-sm bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus:border-emerald-500 transition-all"
                />
                <p className="text-[10px] text-zinc-400 font-medium px-1">Lowercase, numbers, and hyphens only.</p>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <Alert variant="destructive" className="rounded-2xl border-2 bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800/50">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="font-black">Action Required</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                    <Alert className="rounded-2xl border-2 bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle className="font-black">Victory!</AlertTitle>
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row gap-3 p-6 border-t border-zinc-100 dark:border-zinc-800">
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full sm:w-auto rounded-2xl font-bold" 
                onClick={() => router.back()} 
                disabled={isPending}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button 
                type="submit" 
                className="w-full sm:flex-1 rounded-2xl font-black bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors" 
                disabled={isPending}
              >
                {isPending ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Working...</>
                ) : (
                  <><PlusCircle className="mr-2 h-4 w-4" /> Create Category</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}