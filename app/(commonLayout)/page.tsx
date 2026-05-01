import FeaturedTutors from "@/components/layouts/FeaturedTutors";
import { HeroSection } from "@/components/layouts/HeroSection";
import HowItWorksSection from "@/components/layouts/HowItWorksSection";
import NewsLetterSection from "@/components/layouts/NewsLetterSection";
import OurGoal from "@/components/layouts/OurGoal";
import PopularSubjectsSection from "@/components/layouts/PopularSubjectsSection";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SkillBridge | Home",
  description: "Welcome to skillBridge home to continue learning",
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedTutors></FeaturedTutors>
      <PopularSubjectsSection></PopularSubjectsSection>
      <HowItWorksSection></HowItWorksSection>
      <OurGoal></OurGoal>
      <NewsLetterSection></NewsLetterSection>
    </div>
  );
}
