"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import navLogo from "@/public/nav-logo.png";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Globe, Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail("");
    // Add your subscription logic here
  };

  const menuItems = [
    {
      title: "Platform",
      links: [
        { text: "Browse Tutors", url: "/tutors" },
        { text: "How It Works", url: "/how-it-works" },
        { text: "For Tutors", url: "/become-tutor" },
        { text: "Pricing", url: "/pricing" },
        { text: "Success Stories", url: "/success-stories" },
        { text: "FAQ", url: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Careers", url: "/careers" },
        { text: "Press", url: "/press" },
        { text: "Blog", url: "/blog" },
        { text: "Partners", url: "/partners" },
        { text: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Learning Center", url: "/learning-center" },
        { text: "Tutor Resources", url: "/tutor-resources" },
        { text: "Student Resources", url: "/student-resources" },
        { text: "Webinars", url: "/webinars" },
        { text: "Help Center", url: "/help" },
        { text: "Community", url: "/community" },
      ],
    },
    {
      title: "Subjects",
      links: [
        { text: "Mathematics", url: "/tutors?subject=mathematics" },
        { text: "Science", url: "/tutors?subject=science" },
        { text: "Programming", url: "/tutors?subject=programming" },
        { text: "Languages", url: "/tutors?subject=languages" },
        { text: "Business", url: "/tutors?subject=business" },
        { text: "Test Prep", url: "/tutors?subject=test-prep" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, url: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, url: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, url: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, url: "#", label: "LinkedIn" },
  ];

  const trustBadges = [
    { icon: <Shield className="h-4 w-4" />, text: "SSL Secure", color: "bg-emerald-500" },
    { icon: <Users className="h-4 w-4" />, text: "Verified Tutors", color: "bg-blue-500" },
    { icon: <Award className="h-4 w-4" />, text: "Money Back Guarantee", color: "bg-amber-500" },
    { icon: <Globe className="h-4 w-4" />, text: "24/7 Support", color: "bg-purple-500" },
  ];

  return (
    <footer className={cn("bg-gradient-to-b from-background to-muted/5 border-t", className)}>
      {/* Newsletter Section */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
              Stay Updated with SkillBridge
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-2 sm:px-0">
              Get the latest tutoring tips, platform updates, and exclusive offers delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4 sm:px-0">
              <div className="relative flex-1">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-10 sm:h-12 pl-9 sm:pl-12 pr-4 rounded-full border border-input bg-background text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <Button 
                type="submit" 
                className="h-10 sm:h-12 px-6 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
              >
                <span className="text-sm sm:text-base font-semibold">Subscribe</span>
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3 px-4 sm:px-0">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description - Full width on mobile, spans 2 cols on lg+ */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Image 
                  src={navLogo} 
                  alt="SkillBridge Logo" 
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 hover:scale-105 transition-transform"
                />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    SkillBridge
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground tracking-wider">
                    CONNECT • LEARN • GROW
                  </span>
                </div>
              </div>
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              SkillBridge connects passionate learners with expert tutors worldwide. 
              Our mission is to make quality education accessible to everyone.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  123 Learning Street, Education City, EC 12345
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground">support@skillbridge.com</span>
              </div>
            </div>
          </div>

          {/* Menu Sections - Responsive grid */}
          {menuItems.map((section, index) => (
            <div key={index} className="sm:col-span-1">
              <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">
                {section.title}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.url}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block py-1"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges - Mobile stacked, desktop inline */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map((badge, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className={`p-2 rounded-full ${badge.color}/10`}>
                  {badge.icon}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium">{badge.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">Trust & Safety</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-xs sm:text-sm text-muted-foreground">
                © {currentYear} SkillBridge. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Empowering learners worldwide since 2023
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 sm:gap-3">
              <p className="text-xs sm:text-sm text-muted-foreground mr-2 sm:mr-3">
                Follow us:
              </p>
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className="p-2 sm:p-2.5 rounded-full hover:bg-primary/10 transition-all duration-300 text-muted-foreground hover:text-primary hover:scale-110"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
              <Link 
                href="/accessibility" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>

          {/* Download Apps */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
            <div className="text-center">
              <p className="text-sm sm:text-base font-medium mb-4">Download Our App</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 hover:border-primary/50 transition-all"
                >
                  <Link href="#" className="flex items-center gap-3">
                    <div className="text-2xl">📱</div>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-bold">App Store</div>
                    </div>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 hover:border-primary/50 transition-all"
                >
                  <Link href="#" className="flex items-center gap-3">
                    <div className="text-2xl">🤖</div>
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm font-bold">Google Play</div>
                    </div>
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 hover:border-primary/50 transition-all"
                >
                  <Link href="#" className="flex items-center gap-3">
                    <div className="text-2xl">💻</div>
                    <div className="text-left">
                      <div className="text-xs">Use on</div>
                      <div className="text-sm font-bold">Web Browser</div>
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Links - Only show on small screens */}
          <div className="mt-6 pt-6 border-t border-border/50 lg:hidden">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <Link href="/sitemap" className="text-muted-foreground hover:text-foreground">
                Sitemap
              </Link>
              <Link href="/affiliates" className="text-muted-foreground hover:text-foreground">
                Affiliate Program
              </Link>
              <Link href="/investors" className="text-muted-foreground hover:text-foreground">
                Investors
              </Link>
              <Link href="/status" className="text-muted-foreground hover:text-foreground">
                System Status
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Extra small screen adjustments */}
      <div className="bg-muted/20 py-3 border-t border-border/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-muted-foreground">
            SkillBridge is an equal opportunity platform. We welcome tutors and students from all backgrounds.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };