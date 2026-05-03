"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-gradient-to-r from-background to-primary/5">
      <div className="flex items-end gap-2">
        {/* Suggestion Button */}
        <button
          className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors flex-shrink-0"
          title="Ask a suggestion"
        >
          <Sparkles className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about tutors, subjects, or pricing..."
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-2.5 rounded-2xl border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm min-h-[42px] max-h-[120px]"
            style={{ lineHeight: "1.5" }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || disabled}
          className={cn(
            "p-2.5 rounded-xl transition-all duration-300 flex-shrink-0",
            input.trim() && !disabled
              ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 hover:scale-105"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      
      {/* Footer Note */}
      <div className="mt-2 text-center">
        <p className="text-[10px] text-muted-foreground">
          AI-generated recommendations • Based on tutor availability
        </p>
      </div>
    </div>
  );
};

export default ChatInput;