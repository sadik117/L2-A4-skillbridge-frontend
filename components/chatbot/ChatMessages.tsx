"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, User, Star, Clock,  ExternalLink, Sparkles, MessageCircle } from "lucide-react";
import { Message } from "./Chatbot";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  suggestions?: any[];
  showSuggestions?: boolean;
  onSuggestionClick?: (query: string) => void;
}

const ChatMessages = ({ 
  messages, 
  isLoading, 
  suggestions = [], 
  showSuggestions = true,
  onSuggestionClick 
}: ChatMessagesProps) => {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "flex gap-3",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          {/* Avatar */}
          <div className={cn(
            "flex-shrink-0",
            message.role === "user" ? "order-2" : "order-1"
          )}>
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shadow-md",
                message.role === "user" 
                  ? "bg-gradient-to-r from-primary to-purple-600" 
                  : "bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30"
              )}
            >
              {message.role === "user" ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-primary" />
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className={cn(
            "flex flex-col gap-2 max-w-[85%]",
            message.role === "user" ? "order-1" : "order-2"
          )}>
            {/* Message Bubble */}
            <div
              className={cn(
                "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                message.role === "user"
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white rounded-tr-none"
                  : "bg-muted/80 dark:bg-gray-800/80 border border-border rounded-tl-none"
              )}
            >
              {message.content}
            </div>

            {/* Timestamp */}
            <div className={cn(
              "text-[10px] text-muted-foreground",
              message.role === "user" ? "text-right" : "text-left"
            )}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            {/* Tutor Recommendations */}
            {message.tutors && message.tutors.length > 0 && (
              <div className="mt-2 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>Recommended tutors based on your request:</span>
                </div>
                <div className="grid gap-3">
                  {message.tutors.map((tutor: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="group relative bg-white dark:bg-gray-900 border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="p-3">
                        <div className="flex items-start gap-3 mb-2">
                          {/* Tutor Avatar */}
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-md">
                              <span className="text-white font-bold text-sm">
                                {tutor.name?.charAt(0) || "T"}
                              </span>
                            </div>
                            {tutor.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between flex-wrap gap-1">
                              <h4 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                                {tutor.name}
                              </h4>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-medium">{tutor.rating || 4.7}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                                {tutor.category}
                              </span>
                              {tutor.experience && (
                                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                  <Clock className="h-2 w-2" />
                                  {tutor.experience}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Tutor Reason */}
                        {tutor.reason && (
                          <p className="text-xs text-muted-foreground mb-3 italic leading-relaxed">
                            "{tutor.reason}"
                          </p>
                        )}

                        {/* View Tutor Profile  Button*/}
                        {(tutor.id || tutor._id) && (
                          <Link href={`/tutor/profile/${tutor.id || tutor._id}`}>
                            <button className="w-full py-2 text-xs font-medium bg-gradient-to-r from-primary/10 to-purple-600/10 hover:from-primary/20 hover:to-purple-600/20 text-primary rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                              <span>View Full Profile</span>
                              <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Suggestions Section - Only show when no messages or at the beginning */}
      {showSuggestions && messages.length <= 1 && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <MessageCircle className="h-3 w-3 text-primary" />
            <span>Try asking me:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 6).map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => onSuggestionClick?.(suggestion.query)}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs bg-muted/50 hover:bg-muted dark:bg-gray-800/50 dark:hover:bg-gray-800 border border-border rounded-full transition-all duration-200 group"
              >
                <span className="text-primary">{suggestion.icon}</span>
                <span>{suggestion.text}</span>
                <Sparkles className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-3 justify-start"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 flex items-center justify-center border border-primary/30">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div className="bg-muted/80 dark:bg-gray-800/80 border border-border p-3 rounded-2xl rounded-tl-none shadow-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatMessages;