"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Home,
  BookOpen,
  GraduationCap,
  LogOut,
  User,
  X,
  Cuboid,
  CuboidIcon,
  PenBoxIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import navLogo from "@/public/nav-logo.png";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";

export const Navbar = () => {
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    role?: string;
  } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Check user on mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) setUser(data.user);
      } catch {
        setUser(null);
      }
    };
    getUser();

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  const navigation = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      title: "Browse Tutors",
      href: "/browse-tutors",
      icon: <GraduationCap className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
      title: "Book Sessions",
      href: "/browse-tutors",
      icon: <BookOpen className="h-4 w-4 md:h-5 md:w-5" />,
    },
    
    ...(user?.role && user.role !== "TUTOR"
      ? [
          {
            title: "Become a Tutor",
            href: "/become-tutor",
            icon: <PenBoxIcon className="h-4 w-4 md:h-5 md:w-5" />,
          },
        ]
      : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${scrolled ? "shadow-sm" : ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-14 sm:h-16 md:h-18 items-center justify-between">
          {/* Logo - Responsive sizing */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
          >
            <Image
              src={navLogo}
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-2 mx-4 flex-grow justify-center">
            {navigation.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                {item.icon} {item.title}
              </Link>
            ))}
          </nav>

          {/* Auth buttons - Responsive layout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <ModeToggle />
            </div>

            {user ? (
              <>
                {/* User info - responsive display */}
                <div className="hidden md:flex items-center gap-3">
                  <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-sm">
                      {user.name?.split(" ")[0] || "User"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hidden lg:inline-flex"
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="hidden md:inline-flex"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    <span className="hidden lg:inline">Logout</span>
                  </Button>
                </div>

                {/* Mobile user button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  asChild
                >
                  <Link href="/dashboard">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                {/* Desktop auth buttons */}
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>

                {/* Mobile auth buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="md:hidden px-2"
                >
                  <Link href="/login">
                    <span className="sr-only sm:not-sr-only">Login</span>
                  </Link>
                </Button>
              </>
            )}

            {/* Mobile Mode Toggle */}
            <div className="sm:hidden">
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden flex-shrink-0"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[350px] p-0"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <div className="flex flex-col h-full">
                  <SheetHeader className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center gap-3">
                        <Image
                          src={navLogo}
                          alt="Logo"
                          width={32}
                          height={32}
                        />
                        <span className="text-lg font-semibold">
                          SkillBridge
                        </span>
                      </SheetTitle>
                    </div>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto p-4">
                    {/* User info in mobile menu */}
                    {user && (
                      <div className="mb-6 p-3 rounded-lg bg-accent">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name || "User"}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mobile Navigation Links */}
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-base font-medium"
                        >
                          <span className="text-primary">{item.icon}</span>
                          {item.title}
                        </Link>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t" />

                    {/* Auth section in mobile menu */}
                    <div className="space-y-3">
                      {user ? (
                        <>
                          <Button
                            asChild
                            className="w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Link href="/dashboard" className="w-full">
                              Dashboard
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                              logout();
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            <LogOut className="h-4 w-4 mr-2" /> Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            asChild
                            className="w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button
                            asChild
                            className="w-full bg-purple-600 text-white hover:bg-purple-700"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Link href="/signup">Sign Up</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Tablet Navigation - Show on md screens only */}
        <nav className="lg:hidden md:flex hidden items-center justify-center gap-4 py-3 border-t">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent flex-1 justify-center"
            >
              {item.icon}
              <span className="hidden sm:inline">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
