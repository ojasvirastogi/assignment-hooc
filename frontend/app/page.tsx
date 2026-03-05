import Hero from "@/components/Hero";
import Image from "next/image";
import Projects from "@/components/projects";
import Stats from "@/components/Stats";
import BrandSection from "@/components/BrandSection";
import AwardSection from "@/components/AwardsSection";
import TestimonialSection from "@/components/TestimonialSection";
import CarouselSection from "@/components/CrouselSection";
import Question from "@/components/Question";
import BrandExperienceSection from "@/components/BrandExperienceSection";
export default function Home() {
  return (
   <main>
      <Hero/>
      <Projects/>
      <Stats/>    
      <BrandExperienceSection/>
      <BrandSection/>
      <AwardSection/>
     <TestimonialSection/>
<CarouselSection/>
<Question/>

    </main>
  );
}
