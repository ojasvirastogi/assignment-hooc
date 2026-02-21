import Hero from "@/components/Hero";
import Image from "next/image";
import Projects from "@/components/projects";
import Stats from "@/components/Stats";
import ClientLogos from "@/components/ClientLogos";
import IndustrySection from "@/components/IndustrySection";
import BrandSection from "@/components/BrandSection";
import AwardSection from "@/components/AwardsSection";
import TestimonialSection from "@/components/TestimonialSection";
import CarouselSection from "@/components/CrouselSection";
import Question from "@/components/Question";
import FooterSection from "@/components/FooterSection";
export default function Home() {
  return (
   <main>
      <Hero />
      <Projects />
      <Stats/>
      <ClientLogos/>
      <IndustrySection/>
      <BrandSection/>
      <AwardSection/>
     <TestimonialSection/>
<CarouselSection/>
<Question/>
<FooterSection/>
    </main>
  );
}
