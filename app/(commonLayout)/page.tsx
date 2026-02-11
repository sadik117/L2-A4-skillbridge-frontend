import FeaturedTutors from "@/components/layouts/FeaturedTutors";
import { HeroSection } from "@/components/layouts/HeroSection";
import HowItWorksSection from "@/components/layouts/HowItWorksSection";
import PopularSubjectsSection from "@/components/layouts/PopularSubjectsSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedTutors></FeaturedTutors>
      <PopularSubjectsSection></PopularSubjectsSection>
      <HowItWorksSection></HowItWorksSection>
    </div>
  );
}
