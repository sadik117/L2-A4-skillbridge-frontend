"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GraduationCap, Loader2, CheckCircle2, ArrowRight, ShieldCheck, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { updateRoleToTutor } from "./serverAction";

export default function BecomeTutorClient() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBecomeTutor = () => {
    startTransition(async () => {
      const result = await updateRoleToTutor();

      if (result.success) {
        toast.success("Account upgraded successfully!");
        router.push("/tutor-dashboard/profile");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12 transition-colors">
      <div className="w-full max-w-lg">
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl">
          <CardHeader className="text-center pt-10 pb-6 border-b border-zinc-50 dark:border-zinc-800">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 rotate-3">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight dark:text-zinc-50">Join the Faculty</CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-2">
              Transform your expertise into a rewarding career.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-8 px-8">
            <FeatureRow 
              icon={<CheckCircle2 className="text-emerald-500" />} 
              title="Set Your Terms" 
              desc="Total control over your hourly rates." 
            />
            <FeatureRow 
              icon={<Globe className="text-indigo-500" />} 
              title="Global Reach" 
              desc="Connect with students worldwide." 
            />
            <FeatureRow 
              icon={<ShieldCheck className="text-amber-500" />} 
              title="Secure Payments" 
              desc="Get paid directly for every session." 
            />
          </CardContent>

          <CardFooter className="px-8 pb-10 pt-4">
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-md font-bold transition-all"
              onClick={handleBecomeTutor}
              disabled={isPending}
            >
              {isPending ? (
                <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Processing...</>
              ) : (
                <span className="flex items-center gap-2">Get Started <ArrowRight className="h-4 w-4" /></span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800">{icon}</div>
      <div>
        <h4 className="text-sm font-semibold dark:text-zinc-200">{title}</h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
      </div>
    </div>
  );
}