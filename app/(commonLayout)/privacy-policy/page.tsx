"use client";

import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Server, 
  Mail, 
  Globe,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  FileText,
  Cookie,
  Trash2,
  Share2,
  Bell,
  Smartphone
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 11, 2026";

  const sections = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "1. Information We Collect",
      content: [
        "Personal information you provide (name, email, phone number, payment details)",
        "Account credentials and profile information",
        "Communication data from messages and support tickets",
        "Session recordings and learning progress (with your consent)",
        "Device information and usage analytics",
        "Location data (with your permission)"
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "2. How We Use Your Information",
      content: [
        "Provide, maintain, and improve our tutoring services",
        "Process payments and prevent fraud",
        "Match you with suitable tutors based on your learning needs",
        "Send important notifications about your sessions and account",
        "Analyze usage patterns to enhance user experience",
        "Comply with legal obligations"
      ]
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "3. Information Sharing",
      content: [
        "We never sell your personal information to third parties",
        "Share necessary information with tutors to facilitate sessions",
        "Service providers who assist with payment processing, video hosting, and analytics",
        "Law enforcement when required by law or to protect our rights",
        "With your explicit consent for specific purposes"
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "4. Data Security",
      content: [
        "256-bit SSL encryption for all data transmission",
        "Regular security audits and penetration testing",
        "Secure data centers with 24/7 monitoring",
        "Access controls and authentication protocols",
        "Automated backup systems for data recovery",
        "Compliance with industry security standards"
      ]
    },
    {
      icon: <Cookie className="h-6 w-6" />,
      title: "5. Cookies & Tracking",
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to improve our services",
        "Preference cookies to remember your settings",
        "You can control cookie preferences in your browser",
        "Third-party cookies from integrated services"
      ]
    },
    {
      icon: <Trash2 className="h-6 w-6" />,
      title: "6. Your Rights",
      content: [
        "Access and review your personal data",
        "Request corrections to inaccurate information",
        "Delete your account and associated data",
        "Opt-out of marketing communications",
        "Export your data in a portable format",
        "Lodge complaints with supervisory authorities"
      ]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "7. Data Retention",
      content: [
        "Active account data retained while your account exists",
        "Session recordings kept for 30 days for quality assurance",
        "Payment information retained for legal compliance (7 years)",
        "Deleted data permanently removed within 90 days",
        "Anonymized data may be kept for analytics"
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "8. Children's Privacy",
      content: [
        "Platform intended for users 13 years and older",
        "Parental consent required for users under 18",
        "Special protections for student data",
        "Parents can review and delete their child's information"
      ]
    }
  ];

  const contactInfo = {
    email: "privacy@skillbridge.com",
    address: "123 Learning Street, Education City, EC 12345",
    phone: "+1 (555) 123-4567"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background dark:from-gray-950 dark:via-primary/5 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-10 md:py-14 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Privacy Matters</span>
          </div>
          
          <h1 className="text-xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <p className="text-sm md:text-xl text-muted-foreground max-w-3xl mx-auto">
            How we collect, use, and protect your information
          </p>
        
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        
        {/* Introduction Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-600/10 to-blue-600/10 dark:from-primary/5 dark:via-purple-600/5 dark:to-blue-600/5 border border-primary/20 dark:border-primary/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Our Commitment to Privacy
              </h2>
              <p className="text-muted-foreground">
                At SkillBridge, we take your privacy seriously. This policy explains how we collect, use, disclose, 
                and safeguard your information when you use our platform. We're committed to transparency and giving 
                you control over your personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Key Privacy Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Data Protection</h3>
            <p className="text-sm text-muted-foreground">256-bit SSL encryption</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Full Transparency</h3>
            <p className="text-sm text-muted-foreground">Clear data practices</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">User Control</h3>
            <p className="text-sm text-muted-foreground">Manage your data</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Server className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Secure Storage</h3>
            <p className="text-sm text-muted-foreground">Industry standards</p>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:border-primary/30 dark:hover:border-primary/40 transition-all duration-300"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                
                <div className="pl-14">
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-600/10 to-blue-600/10 dark:from-primary/5 dark:via-purple-600/5 dark:to-blue-600/5 border border-primary/20 dark:border-primary/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Questions About Our Privacy Policy?
                </h3>
                <p className="text-muted-foreground">
                  Our privacy team is here to help. Contact us for any privacy-related concerns.
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Email:</strong> {contactInfo.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Phone:</strong> {contactInfo.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Address:</strong> {contactInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}