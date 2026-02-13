"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Calendar, 
  User, 
  Users, 
  Settings, 
  BookOpen, 
  BarChart3, 
  FolderTree, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  HelpCircle,
  LogOut,
  UserCog,
  Clock,
  CreditCard,
  Star,
  MessageSquare,
  Files,
  Sun,
  Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";

type Props = {
  role: "ADMIN" | "STUDENT" | "TUTOR";
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
};

// Separate component for sidebar content
interface SidebarContentProps {
  role: "ADMIN" | "STUDENT" | "TUTOR";
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  collapsed: boolean;
  isMobile: boolean;
  darkMode: boolean;
  path: string;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

const SidebarContent = ({
  role,
  user,
  collapsed,
  isMobile,
  darkMode,
  path,
  onToggleCollapse,
  onCloseMobile,
  onToggleDarkMode,
  onLogout
}: SidebarContentProps) => {

  const iconMap = {
    Overview: <Home className="h-5 w-5" />,
    Dashboard: <Home className="h-5 w-5" />,
    Statistics: <BarChart3 className="h-5 w-5" />,
    "My Bookings": <Calendar className="h-5 w-5" />,
    Bookings: <Calendar className="h-5 w-5" />,
    Profile: <User className="h-5 w-5" />,
    Availability: <Clock className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    Categories: <FolderTree className="h-5 w-5" />,
    "My Sessions": <BookOpen className="h-5 w-5" />,
    "Session History": <Files className="h-5 w-5" />,
    Reviews: <Star className="h-5 w-5" />,
    Messages: <MessageSquare className="h-5 w-5" />,
    Payments: <CreditCard className="h-5 w-5" />,
    Settings: <Settings className="h-5 w-5" />,
  };

  const studentLinks = [
    { href: "/student-dashboard", label: "Overview", icon: iconMap.Overview },
    { href: "/student-dashboard/my-bookings", label: "My Bookings", icon: iconMap["My Bookings"] },
    { href: "/student-dashboard/my-profile", label: "Profile", icon: iconMap.Profile },
  ];

  const tutorLinks = [
    { href: "/tutor-dashboard", label: "Dashboard", icon: iconMap.Dashboard },
    { href: "/tutor-dashboard/availability", label: "Availability", icon: iconMap.Availability },
    { href: "/tutor-dashboard/bookings", label: "Bookings", icon: iconMap.Bookings },
    { href: "/tutor-dashboard/profile", label: "Set Profile", icon: iconMap.Profile },
  ];

  const adminLinks = [
    { href: "/admin-dashboard", label: "Statistics", icon: iconMap.Statistics },
    { href: "/admin-dashboard/users", label: "Users", icon: iconMap.Users },
    { href: "/admin-dashboard/bookings", label: "Bookings", icon: iconMap.Bookings },
    { href: "/admin-dashboard/add-category", label: "Categories", icon: iconMap.Categories },
  ];

  const links = role === "ADMIN" ? adminLinks : role === "TUTOR" ? tutorLinks : studentLinks;

  const roleColors = {
    ADMIN: darkMode 
      ? "bg-red-500/20 text-red-300 border-red-700/30" 
      : "bg-red-500/10 text-red-700 border-red-200",
    TUTOR: darkMode 
      ? "bg-blue-500/20 text-blue-300 border-blue-700/30" 
      : "bg-blue-500/10 text-blue-700 border-blue-200",
    STUDENT: darkMode 
      ? "bg-green-500/20 text-green-300 border-green-700/30" 
      : "bg-green-500/10 text-green-700 border-green-200",
  };

  const roleLabels = {
    ADMIN: "Administrator",
    TUTOR: "Tutor",
    STUDENT: "Student",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={cn("p-4 border-b", collapsed && "px-3", 
        darkMode ? "border-gray-800" : "border-gray-200"
      )}>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-3">
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center",
                darkMode 
                  ? "bg-gradient-to-br from-purple-700 to-blue-600" 
                  : "bg-gradient-to-br from-purple-600 to-blue-500"
              )}>
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <span className={cn(
                "text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                darkMode
                  ? "from-purple-400 to-blue-300"
                  : "from-purple-600 to-blue-500"
              )}>
                SkillBridge
              </span>
            </Link>
          )}
          {collapsed && (
            <div className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center mx-auto",
              darkMode 
                ? "bg-gradient-to-br from-purple-700 to-blue-600" 
                : "bg-gradient-to-br from-purple-600 to-blue-500"
            )}>
              <span className="text-white font-bold text-sm">SB</span>
            </div>
          )}
          
          {/* Desktop toggle */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                darkMode 
                  ? "hover:bg-gray-800 text-gray-300" 
                  : "hover:bg-gray-100 text-gray-600"
              )}
              onClick={onToggleCollapse}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
          
          {/* Mobile close button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                darkMode 
                  ? "hover:bg-gray-800 text-gray-300" 
                  : "hover:bg-gray-100 text-gray-600"
              )}
              onClick={onCloseMobile}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* User Profile */}
        {!collapsed && user && (
          <div className={cn(
            "mt-6 p-3 rounded-lg",
            darkMode 
              ? "bg-gradient-to-r from-gray-900/50 to-gray-800/50" 
              : "bg-gradient-to-r from-gray-50 to-gray-100/50"
          )}>
            <div className="flex items-center gap-3">
              <Avatar className={cn(
                "h-10 w-10 border-2 shadow-sm",
                darkMode ? "border-gray-800" : "border-white"
              )}>
                <AvatarImage src={user.avatar} />
                <AvatarFallback className={cn(
                  darkMode 
                    ? "bg-gradient-to-br from-purple-700 to-blue-600 text-white" 
                    : "bg-gradient-to-br from-purple-500 to-blue-400 text-white"
                )}>
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-semibold text-sm truncate",
                  darkMode ? "text-gray-100" : "text-gray-900"
                )}>
                  {user.name || "User"}
                </p>
                <p className={cn(
                  "text-xs truncate",
                  darkMode ? "text-gray-400" : "text-muted-foreground"
                )}>
                  {user.email}
                </p>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "mt-1 text-xs px-2 py-0.5",
                    roleColors[role]
                  )}
                >
                  {roleLabels[role]}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {collapsed && user && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mt-6 flex justify-center">
                  <Avatar className={cn(
                    "h-10 w-10 border-2 shadow-sm",
                    darkMode ? "border-gray-800" : "border-white"
                  )}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className={cn(
                      darkMode 
                        ? "bg-gradient-to-br from-purple-700 to-blue-600 text-white" 
                        : "bg-gradient-to-br from-purple-500 to-blue-400 text-white"
                    )}>
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className={cn(
                darkMode ? "bg-gray-900 border-gray-700" : ""
              )}>
                <div className="text-center">
                  <p className={cn(
                    "font-semibold",
                    darkMode ? "text-gray-100" : ""
                  )}>{user.name}</p>
                  <p className={cn(
                    "text-xs",
                    darkMode ? "text-gray-400" : "text-muted-foreground"
                  )}>{roleLabels[role]}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {links.map((link) => {
            const isActive = path === link.href || path.startsWith(link.href + "/");
            
            return (
              <TooltipProvider key={link.href} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={link.href}
                      onClick={() => isMobile && onCloseMobile()}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        darkMode
                          ? "hover:bg-gradient-to-r hover:from-purple-900/20 hover:to-blue-900/20 hover:text-purple-300"
                          : "hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700",
                        "hover:shadow-sm",
                        isActive && darkMode && 
                        "bg-gradient-to-r from-purple-800 to-blue-700 text-white shadow-md",
                        isActive && !darkMode && 
                        "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md",
                        !isActive && darkMode && "text-gray-300",
                        !isActive && !darkMode && "text-gray-700",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <span className={cn(
                        isActive && "text-white",
                        !isActive && darkMode && "text-gray-400",
                        !isActive && !darkMode && "text-gray-500"
                      )}>
                        {link.icon}
                      </span>
                      
                      {!collapsed && (
                        <span className="flex-1">{link.label}</span>
                      )}
                      
                      {/* {link.badge && !collapsed && (
                        <Badge 
                          variant={isActive ? "secondary" : "outline"} 
                          className={cn(
                            "ml-auto h-5 px-1.5 text-xs",
                            isActive && "bg-white/20 text-white",
                            !isActive && darkMode && "bg-gray-800 text-gray-300 border-gray-700"
                          )}
                        >
                          {link.badge}
                        </Badge>
                      )} */}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className={cn(
                      darkMode ? "bg-gray-900 border-gray-700" : ""
                    )}>
                      <div className="flex items-center">
                        {link.label}
                        {/* {link.badge && (
                          <Badge className={cn(
                            "ml-2 h-4 px-1 text-xs",
                            darkMode ? "bg-gray-800" : ""
                          )}>
                            {link.badge}
                          </Badge>
                        )} */}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>

        <Separator className={cn(
          "my-6",
          darkMode ? "bg-gray-800" : "bg-gray-200"
        )} />

        {/* Additional Links */}
        <div className="space-y-1">
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            className={cn(
              "w-full justify-start transition-all duration-200",
              collapsed && "justify-center",
              darkMode 
                ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
            onClick={onToggleDarkMode}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            {!collapsed && (
              <span className="ml-3">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </Button>
          
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            className={cn(
              "w-full justify-start transition-all duration-200",
              collapsed && "justify-center",
              darkMode 
                ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
            asChild
          >
            <Link href="/help">
              <HelpCircle className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Help & Support</span>}
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            className={cn(
              "w-full justify-start transition-all duration-200",
              collapsed && "justify-center",
              darkMode 
                ? "text-gray-300 hover:text-gray-100 hover:bg-gray-800" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
            asChild
          >
            <Link href="/settings">
              <UserCog className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Account Settings</span>}
            </Link>
          </Button>
        </div>
      </nav>

      {/* Footer */}
      <div className={cn(
        "border-t p-4",
        darkMode ? "border-gray-800" : "border-gray-200"
      )}>
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={cn(
            "w-full justify-start transition-all duration-200",
            collapsed && "justify-center",
            darkMode 
              ? "text-red-400 hover:text-red-300 hover:bg-red-900/20" 
              : "text-red-600 hover:text-red-700 hover:bg-red-50"
          )}
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default function Sidebar({ role, user }: Props) {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      if (document.documentElement.classList.contains("dark")) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    };

    checkDarkMode();
    
    // Create a mutation observer to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const logout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "fixed top-4 left-4 z-50 lg:hidden h-10 w-10 shadow-md",
            darkMode 
              ? "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800" 
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
          )}
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col h-screen border-r shadow-sm sticky top-0 transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          darkMode 
            ? "bg-gray-950 border-gray-800" 
            : "bg-white border-gray-200"
        )}
      >
        <SidebarContent
          role={role}
          user={user}
          collapsed={collapsed}
          isMobile={isMobile}
          darkMode={darkMode}
          path={path}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onCloseMobile={() => setMobileOpen(false)}
          onToggleDarkMode={toggleDarkMode}
          onLogout={logout}
        />
      </aside>

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {/* Overlay */}
          {mobileOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-50 flex flex-col h-screen border-r shadow-xl transition-transform duration-300 lg:hidden",
              mobileOpen ? "translate-x-0" : "-translate-x-full",
              darkMode 
                ? "bg-gray-950 border-gray-800" 
                : "bg-white border-gray-200"
            )}
          >
            <SidebarContent
              role={role}
              user={user}
              collapsed={collapsed}
              isMobile={isMobile}
              darkMode={darkMode}
              path={path}
              onToggleCollapse={() => setCollapsed(!collapsed)}
              onCloseMobile={() => setMobileOpen(false)}
              onToggleDarkMode={toggleDarkMode}
              onLogout={logout}
            />
          </aside>
        </>
      )}
    </>
  );
}