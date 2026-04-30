"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  HelpCircle, 
  User, 
  CreditCard, 
  BookOpen, 
  Wrench, 
  Shield, 
  MessageCircle,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle,
  Award,
  Mail,
  Phone,
  Globe,
  PlayCircle,
  FileText,
  Users,
  Settings
} from "lucide-react";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using SkillBridge for the first time.",
      icon: <PlayCircle className="h-8 w-8" />,
      href: "",
      color: "from-primary to-purple-600",
      articles: 12,
      popular: true
    },
    {
      title: "Account Management",
      description: "Manage your profile, settings, and notifications.",
      icon: <User className="h-8 w-8" />,
      href: "",
      color: "from-blue-500 to-cyan-500",
      articles: 8,
      popular: true
    },
    {
      title: "Payments & Billing",
      description: "Everything you need to know about payments, invoices, and refunds.",
      icon: <CreditCard className="h-8 w-8" />,
      href: "",
      color: "from-emerald-500 to-green-500",
      articles: 10,
      popular: false
    },
    {
      title: "Tutor Guidelines",
      description: "Rules, expectations, and best practices for our tutors.",
      icon: <BookOpen className="h-8 w-8" />,
      href: "",
      color: "from-amber-500 to-orange-500",
      articles: 15,
      popular: true
    },
    {
      title: "Troubleshooting",
      description: "Solutions to common technical issues and platform errors.",
      icon: <Wrench className="h-8 w-8" />,
      href: "",
      color: "from-red-500 to-pink-500",
      articles: 20,
      popular: false
    },
    {
      title: "Safety & Security",
      description: "How we keep our platform safe and protect your data.",
      icon: <Shield className="h-8 w-8" />,
      href: "",
      color: "from-purple-500 to-indigo-500",
      articles: 9,
      popular: true
    }
  ];

  const quickLinks = [
    { icon: <Mail className="h-4 w-4" />, label: "Email Support", value: "support@skillbridge.com" },
    { icon: <MessageCircle className="h-4 w-4" />, label: "Live Chat", value: "Available 24/7" },
    { icon: <Clock className="h-4 w-4" />, label: "Response Time", value: "< 24 hours" },
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background dark:from-gray-950 dark:via-primary/5 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-10 md:py-14 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Support Center</span>
          </div>
          
          <h1 className="text-2xl  md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            How Can We Help You?
          </h1>
          
          <p className="text-sm md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers, guides, and support resources for all your questions
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-base"
              />
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              {quickLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  {link.icon}
                  <span>{link.label}:</span>
                  <span className="font-medium text-foreground">{link.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        
        {/* Popular Categories */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Browse by Category</h2>
              <p className="text-muted-foreground">Find help articles organized by topic</p>
            </div>
            {searchQuery && (
              <div className="text-sm text-muted-foreground">
                Found {filteredCategories.length} results
              </div>
            )}
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search term or browse by category
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="group relative p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Popular Badge */}
                  {category.popular && (
                    <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Popular
                    </div>
                  )}
                  
                  <div className="relative">
                    <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {category.articles} articles
                      </span>
                      <ChevronRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Still Need Help Section */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Support
                </button>
              </Link>
              <Link href="/faq">
                <button className="px-8 py-3 rounded-full border-2 border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 font-medium hover:text-primary transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  View FAQ
                </button>
              </Link>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">&lt; 24h</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}