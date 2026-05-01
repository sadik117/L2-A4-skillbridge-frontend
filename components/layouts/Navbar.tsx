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
  PenBoxIcon,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      href: "/book-session", 
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

  // User dropdown menu items based on role
  const getDropdownItems = () => {
    const commonItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
      },

    ];

    return { commonItems };
  };

  const { commonItems } = getDropdownItems();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "border-b bg-background/80 backdrop-blur-md py-2" 
          : "bg-transparent py-2"
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="rounded-full pl-2 pr-4 h-10 gap-2 border-2 hover:bg-primary/5 transition-all duration-300"
                    >
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={user.image || undefined} />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold">
                          {user.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden sm:inline-block">
                        {user.name?.split(" ")[0]}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72" align="end" sideOffset={10}>
                    <DropdownMenuLabel className="p-0">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 via-purple-600/5 to-transparent rounded-t-lg">
                        <Avatar className="h-12 w-12 border-2 border-primary/30">
                          <AvatarImage src={user.image || undefined} />
                          <AvatarFallback className="bg-gradient-to-r from-primary to-purple-600 text-white text-base font-bold">
                            {user.name?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-base">{user.name}</span>
                          <span className="text-xs text-muted-foreground capitalize">
                            {user.role?.toLowerCase()}
                          </span>
                          <span className="text-xs text-primary truncate max-w-[180px]">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuGroup>
                      {commonItems.map((item) => (
                        <DropdownMenuItem key={item.title} asChild className="cursor-pointer">
                          <Link href={item.href} className="flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-primary/10">
                              {item.icon}
                            </div>
                            <span>{item.title}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

                {/* Mobile User Profile */}
                {user && (
                  <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/10 via-purple-600/5 to-transparent border border-primary/20">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-14 w-14 border-2 border-primary/30">
                        <AvatarImage src={user.image || undefined} />
                        <AvatarFallback className="bg-gradient-to-r from-primary to-purple-600 text-white text-lg font-bold">
                          {user.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-base">{user.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {user.role?.toLowerCase()}
                        </span>
                        <span className="text-xs text-primary truncate max-w-[180px]">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                    Navigation
                  </p>
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
                      <Separator />
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                        Account
                      </p>
                      
                      {/* Dashboard Links */}
                      <div className="space-y-1">
                        {commonItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-accent"
                          >
                            <div className="p-1.5 rounded-md bg-primary/10">
                              {item.icon}
                            </div>
                            <span className="text-sm">{item.title}</span>
                          </Link>
                        ))}

                      </div>
                      
                      <Separator />
                      
                      <Button 
                        variant="destructive" 
                        className="w-full rounded-xl py-6" 
                        onClick={handleLogout}
                      >
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