"use client";

import { Menu, User, Home, BookOpen, GraduationCap, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import navLogo from "@/public/nav-logo.png";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

interface NavbarProps {
  className?: string;
  isAuthenticated?: boolean;
}

const Navbar = ({
  className,
  isAuthenticated = false,
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { title: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { title: "Browse Tutors", href: "/browse-tutors", icon: <GraduationCap className="h-4 w-4" /> },
    { title: "Book Sessions", href: "/browse-tutors", icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <header className={cn("sticky top-0 z-50 w-full", className)}>
      <div className={cn(
        "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        scrolled && "shadow-sm"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src={navLogo} 
                alt="SkillBridge Logo" 
                width={36} 
                height={36}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                SkillBridge
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <ModeToggle />
              {isAuthenticated ? (
                <> 
                  <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="hidden lg:flex">
                    <Link href="/profile">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild className="hidden lg:flex bg-purple-600 text-white hover:bg-purple-700">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
              
              {/* Mobile Menu Button with Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-3 text-left">
                      <Image 
                        src={navLogo} 
                        alt="SkillBridge Logo" 
                        width={32} 
                        height={32}
                      />
                      <span>SkillBridge</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="py-6">
                    {/* Mobile Navigation Links */}
                    <nav className="flex flex-col space-y-3">
                      {navigation.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                        >
                          {item.icon}
                          {item.title}
                        </Link>
                      ))}
                    </nav>

                    {/* Mobile Auth Buttons */}
                    <div className="mt-8 pt-6 border-t">
                      {isAuthenticated ? (
                        <div className="flex flex-col gap-3">
                          <Button asChild className="w-full">
                            <Link href="/dashboard">Dashboard</Link>
                          </Button>
                          <Button variant="outline" asChild className="w-full">
                            <Link href="/profile" className="flex items-center justify-center gap-2">
                              <User className="h-4 w-4" />
                              Profile
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Button variant="outline" asChild className="w-full">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild className="w-full bg-purple-600 text-white hover:bg-purple-700">
                            <Link href="/signup">Sign Up</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };