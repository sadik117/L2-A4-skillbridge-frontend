"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import navLogo from "@/public/nav-logo.png";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Globe, Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const menuItems = [
    {
      title: "Platform",
      links: [
        { text: "Browse Tutors", url: "/browse-tutors" },
        { text: "Become Tutor", url: "/become-tutor" },
        { text: "How It Works", url: "/how-it-works" },
        { text: "FAQ", url: "/faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "/about-us" },
        { text: "Privacy Policy", url: "/privacy-policy" },
        { text: "Contact", url: "/contact" },
        { text: "Help Center", url: "/help-center" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, url: "https://www.facebook.com/sadiksourov11/", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, url: "https://x.com/sadiksourov117", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, url: "https://www.instagram.com/sadiksourov11/", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/in/sadiksourov11", label: "LinkedIn" },
  ];

  const trustBadges = [
    { icon: <Shield className="h-4 w-4" />, text: "SSL Secure", color: "bg-emerald-500" },
    { icon: <Users className="h-4 w-4" />, text: "Verified Tutors", color: "bg-blue-500" },
    { icon: <Award className="h-4 w-4" />, text: "Money Back Guarantee", color: "bg-amber-500" },
    { icon: <Globe className="h-4 w-4" />, text: "24/7 Support", color: "bg-purple-500" },
  ];

  return (
    <footer className={cn("bg-gradient-to-b from-background to-muted/5 border-t", className)}>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 sm:py-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-20">
          {/* Logo and Description - Full width on mobile, spans 2 cols on lg+ */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex flex-col items-start gap-4 mb-4">
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

          </div>

          {/* Menu Sections - Responsive grid */}
          {menuItems.map((section, index) => (
            <div key={index} className="sm:col-span-1">
              <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1 sm:space-y-2">
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
                      
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Rajshahi, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground">+8801717375585</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground">sadiksourov11@gmail.com</span>
              </div>
            </div>
        </div>

        {/* Trust Badges - Mobile stacked, desktop inline */}
        <div className="mt-4 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
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
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-xs sm:text-sm text-muted-foreground">
                © {currentYear} SkillBridge. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Empowering learners worldwide since 2025
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