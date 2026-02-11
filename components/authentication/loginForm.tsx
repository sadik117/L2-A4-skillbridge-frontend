
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Eye, EyeOff, Lock, Mail, LogIn, Loader2, Shield } from "lucide-react";
import { loginSchema } from "@/lib/authValidators";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "../hooks/useAuthStore";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Fix hydration error by only rendering client-side content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

const form = useForm({
  defaultValues: {
    email: "",
    password: "",
    rememberMe: false,
  },
  validatorAdapter: zodValidator,
  onSubmit: async ({ value }) => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
        rememberMe: value.rememberMe,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user) {

        useAuthStore.getState().setUser(data.user);

        toast.success("Welcome back!", {
          description: `You've successfully logged in ${data.user.name}`,
          icon: <Shield className="h-5 w-5 text-green-500" />,
        });

        router.replace("/"); 
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  },
});

const handleSocialLogin = (provider: "google" | "github") => {
  toast.info("Coming soon!", {
    description: `Social login with ${provider} will be available soon`,
  });
};

  // Prevent hydration mismatch by using mounted state
  if (!mounted) {
    return (
      <Card className="w-full max-w-md mx-auto border-none shadow-2xl bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary via-blue-500 to-primary flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-2xl bg-gradient-to-b from-background to-background/95 backdrop-blur-sm">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary via-blue-500 to-primary flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
              <Shield className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
        <div>
          <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm sm:text-base mt-2">
            Sign in to continue your learning journey
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              className="h-11 sm:h-12 rounded-lg hover:shadow-md transition-all duration-300"
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm sm:text-base">Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("github")}
              className="h-11 sm:h-12 rounded-lg hover:shadow-md transition-all duration-300"
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              <span className="text-sm sm:text-base">GitHub</span>
            </Button>
          </div>
        </div>

        <div className="relative mb-6">
          <Separator className="absolute top-1/2 w-full" />
          <div className="relative flex justify-center">
            <span className="px-3 bg-background text-xs text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 sm:space-y-6"
        >
          <div>
            <form.Field
              name="email"
              validators={{
                onChange: loginSchema.shape.email,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 sm:pl-12 h-11 sm:h-12 text-sm sm:text-base rounded-lg"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  {/* {field.state.meta.errors.length > 0 && (
                    <p className="text-xs sm:text-sm text-destructive mt-1">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )} */}
                </div>
              )}
            </form.Field>
          </div>

          <div>
            <form.Field
              name="password"
              validators={{
                onChange: loginSchema.shape.password,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm sm:text-base">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium hover:underline transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 sm:pl-12 pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base rounded-lg"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 sm:h-8 sm:w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </Button>
                  </div>
                  {/* {field.state.meta.errors.length > 0 && (
                    <p className="text-xs sm:text-sm text-destructive mt-1">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )} */}
                </div>
              )}
            </form.Field>
          </div>

          <div>
            <form.Field name="rememberMe">
              {(field) => (
                <div className="flex items-center space-x-2.5">
                  <Checkbox
                    id="rememberMe"
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                      field.handleChange(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm sm:text-base font-normal cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
              )}
            </form.Field>
          </div>

          <Button
            type="submit"
            className="w-full h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Sign In
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3 sm:space-y-4 pt-0">
        <div className="text-center text-sm sm:text-base">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            href="/signup"
            className="text-primary hover:text-primary/80 font-semibold hover:underline underline-offset-2 transition-all"
          >
            Sign up now
          </Link>
        </div>

        <div className="text-center text-xs text-muted-foreground px-4">
          <p>
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
