"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles, User, ChevronRight, Zap, Clock, Star, TrendingUp, BookOpen, GraduationCap } from "lucide-react";
import { ragService } from "../services/rag.service";
import { cn } from "@/lib/utils";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import Link from "next/link";

export type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  tutors?: any[];
  timestamp: Date;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! 👋 I'm your Skill Bridge AI assistant. I can help you find the perfect tutor based on your needs. Just tell me what you'd like to learn!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Chat suggestions
  const suggestions = [
    {
      icon: <GraduationCap className="h-4 w-4" />,
      text: "Find me a math tutor",
      query: "I need a mathematics tutor for calculus"
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      text: "Learn programming basics",
      query: "I want to learn programming. Can you recommend a programming tutor?"
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      text: "IELTS preparation",
      query: "I need help preparing for IELTS exam"
    },
    {
      icon: <Star className="h-4 w-4" />,
      text: "Top rated tutors",
      query: "Show me the highest rated tutors"
    },
    {
      icon: <Zap className="h-4 w-4" />,
      text: "Physics tutor needed",
      query: "I'm struggling with physics. Can you recommend a physics tutor?"
    },
    {
      icon: <Clock className="h-4 w-4" />,
      text: "Spanish lessons",
      query: "I want to learn Spanish. Find me a Spanish tutor"
    }
  ];

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await ragService.query(content);
      
      // Handle response text and provide a friendly default text if tutors are found
      const answerText = response.data?.answer?.text;
      const hasTutors = response.data?.answer?.tutors?.length > 0;
      let cleanAnswer = answerText || (hasTutors ? "I found some tutors that might be a great fit for you:" : response.message || "Here's what I found:");
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: cleanAnswer,
        tutors: response.data?.answer?.tutors?.map((tutor: any) => {
          // Find matching source by name (case-insensitive and trimmed)
          const source = response.data?.sources?.find((s: any) => 
            s.sourceLabel?.trim().toLowerCase() === tutor.name?.trim().toLowerCase()
          );
          return {
            ...tutor,
            id: source?.sourceId || null
          };
        }) || [],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (query: string) => {
    handleSendMessage(query);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[420px] max-w-[calc(100vw-2rem)] h-[650px] max-h-[calc(100vh-6rem)] bg-gradient-to-b from-background via-background to-primary/5 dark:from-gray-950 dark:via-gray-950 dark:to-primary/5 border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Skill Bridge AI</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-muted-foreground">Ready to help</span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-[10px] text-muted-foreground">Instant replies</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  >
                    <span className="text-sm font-medium">_</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 bg-gradient-to-b from-background to-primary/5 dark:from-gray-950 dark:to-primary/5">
              <ChatMessages 
                messages={messages} 
                isLoading={isLoading} 
                suggestions={suggestions}
                showSuggestions={showSuggestions}
                onSuggestionClick={handleSuggestionClick}
              />
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          </motion.div>
        )}

        {/* Minimized Chat Window */}
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 bg-gradient-to-r from-primary/10 to-purple-600/10 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">Skill Bridge AI</p>
                  <p className="text-xs text-muted-foreground">Click to chat</p>
                </div>
              </div>
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1 hover:bg-primary/10 rounded-full transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative group w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
          isOpen 
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" 
            : "bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-primary/20"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
          </>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;