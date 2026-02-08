"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  BookOpen,
  GraduationCap,
  LogOut,
  User,
  PenBoxIcon,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import navLogo from "@/public/nav-logo.png";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useAuthStore } from "../hooks/useAuthStore";

export const Navbar = () => {
  const { user, setUser, logout } = useAuthStore();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data } = await authClient.getSession();
        setUser(data?.user ?? null);
        // console.log({data});
      } catch {
        setUser(null);
      }
    };
    loadSession();
  }, [setUser]);



  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setIsMobileMenuOpen(false);
  };

  const navigation = [
    { title: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    {
      title: "Browse Tutors",
      href: "/browse-tutors",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      title: "Book Sessions",
      href: "/book-sessions", 
      icon: <BookOpen className="h-4 w-4" />,
    },
    ...(user && user?.role !== "TUTOR"
      ? [
          {
            title: "Become a Tutor",
            href: "/become-tutor",
            icon: <PenBoxIcon className="h-4 w-4" />,
          },
        ]
      : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "border-b bg-background/80 backdrop-blur-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link 
            href="/" 
            className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-primary/10 p-1">
              <Image src={navLogo} alt="Logo" fill className="object-contain p-1" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-muted/50 px-2 py-1.5 rounded-full border border-border/40">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-background text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
               <ModeToggle />
            </div>

            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Button asChild variant="ghost" className="rounded-full">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button 
                    onClick={handleLogout} 
                    variant="destructive" 
                    size="sm" 
                    className="rounded-full px-5"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" className="rounded-full font-medium">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95 bg-gradient-to-r from-primary to-blue-600 hover:opacity-90">
                    <Link href="/signup">Join Now</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden rounded-full border-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
                <SheetHeader className="text-left pb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <Image src={navLogo} alt="Logo" width={28} height={28} />
                    SkillBridge
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Navigation</p>
                  {navigation.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between group px-4 py-3 rounded-xl transition-colors hover:bg-accent"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {item.icon}
                        </div>
                        <span className="font-medium text-sm">{item.title}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                    </Link>
                  ))}
                </div>

                {/* Mobile Footer Section */}
                <div className="mt-auto space-y-4 pt-6">
                  <Separator />
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm font-medium">Theme</span>
                    <ModeToggle />
                  </div>
                  {user ? (
                    <div className="space-y-3 px-2 pb-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50 border border-border">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                          {user.name?.[0] || "U"}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold truncate max-w-[150px]">{user.name}</span>
                          <span className="text-xs text-muted-foreground italic uppercase">{user.role}</span>
                        </div>
                      </div>
                      <Button asChild className="w-full rounded-xl py-6" variant="outline">
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Go to Dashboard</Link>
                      </Button>
                      <Button variant="destructive" className="w-full rounded-xl py-6" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 px-2 pb-4">
                      <Button asChild variant="outline" className="rounded-xl">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild className="rounded-xl shadow-md bg-gradient-to-r from-primary to-blue-600 hover:opacity-90">
                        <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};