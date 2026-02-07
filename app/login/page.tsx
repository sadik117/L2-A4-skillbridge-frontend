// app/login/page.tsx
import LoginForm from "@/components/authentication/loginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In | SkillBridge",
  description: "Sign in to your SkillBridge account to continue learning",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-blue-600/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-xl" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
        <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-600/10 to-transparent blur-xl" />
      </div>

      <div className="container relative min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        {/* Logo */}
        <div className="relative z-10 mb-8 sm:mb-12">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl sm:text-2xl">SB</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent animate-gradient-flow">
                SkillBridge
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground tracking-widest">
                LEARN • CONNECT • GROW
              </span>
            </div>
          </Link>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <LoginForm />
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-8 sm:mt-12 text-center text-sm text-muted-foreground">
          <p className="mb-1">
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
          <p>© {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}