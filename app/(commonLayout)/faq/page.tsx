"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  HelpCircle, 
  CreditCard, 
  Calendar, 
  Shield, 
  Users, 
  BookOpen, 
  Clock,
  Mail,
  MessageCircle,
  Sparkles,
  Lock,
  Globe,
  Zap,
  Award,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I pay for a session?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Payment is securely processed before your session starts through our encrypted payment gateway. Your payment information is never stored on our servers.",
      icon: <CreditCard className="h-5 w-5" />,
      category: "Payments"
    },
    {
      question: "Can I cancel or reschedule a session?",
      answer: "Yes, you can cancel or reschedule up to 24 hours before the session without any penalty. Cancellations made within 24 hours may be subject to a fee. You can manage your bookings directly from your dashboard.",
      icon: <Calendar className="h-5 w-5" />,
      category: "Bookings"
    },
    {
      question: "How are tutors vetted?",
      answer: "All our tutors go through a rigorous 5-step screening process including background checks, qualification verification, teaching demonstration, and a trial session. Only the top 10% of applicants are accepted to ensure the highest quality of instruction.",
      icon: <Shield className="h-5 w-5" />,
      category: "Tutors"
    },
    {
      question: "What subjects do you offer?",
      answer: "We offer over 50 subjects across Mathematics, Sciences, Programming, Languages, Business, Test Prep, Arts, Music, and more. If you don't see a subject, contact us and we'll try to find a specialized tutor for you.",
      icon: <BookOpen className="h-5 w-5" />,
      category: "Subjects"
    },
    {
      question: "How do I get started as a tutor?",
      answer: "To become a tutor, simply click on 'For Tutors' in the navigation bar, fill out the application form, and submit your qualifications. Our team will review your application within 3-5 business days and contact you for an interview.",
      icon: <Users className="h-5 w-5" />,
      category: "Tutors"
    },
    {
      question: "What is your refund policy?",
      answer: "If you're not satisfied with your session, we offer a 100% money-back guarantee for your first session. For subsequent sessions, refunds are handled on a case-by-case basis. Contact our support team within 48 hours of your session.",
      icon: <Award className="h-5 w-5" />,
      category: "Payments"
    },
    {
      question: "How do sessions work?",
      answer: "Sessions are conducted through our integrated video platform with screen sharing, interactive whiteboard, and chat features. Simply log in at your scheduled time, click 'Join Session', and connect with your tutor instantly. No downloads required.",
      icon: <Zap className="h-5 w-5" />,
      category: "Bookings"
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use bank-level encryption (256-bit SSL) to protect your personal and payment information. We never share your data with third parties without your explicit consent.",
      icon: <Lock className="h-5 w-5" />,
      category: "Security"
    }
  ];

  const categories = ["All", ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background dark:from-gray-950 dark:via-primary/5 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-10 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Got Questions?</span>
          </div>
          
          <h1 className="text-2xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          
          <p className="text-md sm:text-xl md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our platform
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-base"
              />
              <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                  : "bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 border border-gray-200 dark:border-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                <HelpCircle className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or category filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 mt-1 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        {faq.icon}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                          {faq.question}
                        </h3>
                        {faq.category && (
                          <span className="inline-flex mt-2 px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                            {faq.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronDown
                      className={`flex-shrink-0 w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="pl-14">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Still Have Questions Section */}
        <div className="mt-16 lg:mt-20">
          <div className="relative rounded-3xl bg-gradient-to-r from-primary/10 via-purple-600/10 to-blue-600/10 dark:from-primary/5 dark:via-purple-600/5 dark:to-blue-600/5 p-8 sm:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" />
            
            <div className="relative text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 dark:bg-primary/30 mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Still Have Questions?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                    Contact Support
                    <Mail className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/browse-tutors">
                  <button className="px-8 py-3 rounded-full border-2 border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary text-gray-700 dark:text-gray-300 font-medium hover:text-primary transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                    Browse Tutors
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">&lt; 24h</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9/5</div>
            <div className="text-sm text-muted-foreground">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}