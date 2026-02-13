"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, User, Mail, Lock, Phone, Loader2 } from "lucide-react";
import { registerSchema } from "@/lib/authValidators";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useAuthStore } from "@/components/hooks/useAuthStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => setMounted(true), []);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student" as "student" | "tutor",
      phone: "",
      terms: false,
    },

    onSubmit: async ({ value }) => {
      setIsLoading(true);

      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.fullName,
        });

        if (error) throw new Error(error.message);

        if (data?.user) {
          setUser(data.user);

          toast.success(`Welcome to SkillBridge, ${value.fullName}!`, {
            description: `You've registered as a ${value.role}`,
          });

          router.replace("/");
        }
      } catch (err: any) {
        toast.error("Registration failed", {
          description: err.message || "Please try again",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (!mounted) {
    return (
      <Card className="w-full max-w-md mx-auto border-none shadow-2xl bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
        <CardContent className="p-8 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-2xl bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Join SkillBridge
          </CardTitle>
          <p className="text-sm sm:text-base mt-2">
            Start your learning journey with expert tutors
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Full Name */}
          <form.Field
            name="fullName"
            validators={{ onChange: registerSchema.shape.fullName }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    className="pl-10 sm:pl-12 h-11 sm:h-12 rounded-lg"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>

                {field.state.meta.errors?.[0]?.message && (
                  <p className="text-xs text-destructive mt-2">
                    {field.state.meta.errors[0].message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field
            name="email"
            validators={{ onChange: registerSchema.shape.email }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 sm:pl-12 h-11 sm:h-12 rounded-lg"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>

                {field.state.meta.errors?.[0]?.message && (
                  <p className="text-xs text-destructive mt-2">
                    {field.state.meta.errors[0].message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Phone */}
          <form.Field name="phone">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    className="pl-10 sm:pl-12 h-11 sm:h-12 rounded-lg"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          </form.Field>

          {/* Password */}
          <form.Field
            name="password"
            validators={{ onChange: registerSchema.shape.password }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 rounded-lg"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>

                {field.state.meta.errors?.[0]?.message && (
                  <p className="text-xs text-destructive mt-2">
                    {field.state.meta.errors[0].message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Confirm Password */}
          <form.Field
            name="confirmPassword"
            validators={{ onChange: registerSchema.shape.confirmPassword }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 rounded-lg"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>

                {field.state.meta.errors?.[0]?.message && (
                  <p className="text-xs text-destructive mt-2">
                    {field.state.meta.errors[0].message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Terms */}
          <form.Field
            name="terms"
            validators={{ onChange: registerSchema.shape.terms }}
          >
            {(field) => (
              <div className="flex items-start space-x-2.5 p-3 rounded-lg border border-border/50">
                <Checkbox
                  id="terms"
                  checked={field.state.value}
                  onCheckedChange={(checked) =>
                    field.handleChange(checked as boolean)
                  }
                  className="mt-0.5"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm sm:text-base cursor-pointer"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            )}
          </form.Field>

          <Button
            type="submit"
            className="w-full h-11 sm:h-12 font-semibold rounded-lg bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2 inline-block" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3 sm:space-y-4 pt-0">
        <div className="text-center text-sm sm:text-base">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold underline">
            Sign in here
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
