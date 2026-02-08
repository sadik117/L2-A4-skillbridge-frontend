import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { Toaster } from "sonner";
import { AuthInit } from "@/components/hooks/authInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skill Bridge",
  description: "This is a learning platform that connects students with tutors for personalized learning experiences.",
};

export const dynamic = "force-dynamic";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthInit/>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem = {false}
            disableTransitionOnChange
          >
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
            <Toaster richColors></Toaster>
          </ThemeProvider>
      </body>
    </html>
  );
}
