"use client"

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function NewsLetterSection() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Subscribed with email:", email);
        setEmail("");
        // subscription logic will be added here
    };
    return (
        <>

            <div className="border-b border-border/50">
                <div className="container mx-auto px-4 sm:px-6 py-12">
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
                                    suppressHydrationWarning
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

        </>
    )
}   