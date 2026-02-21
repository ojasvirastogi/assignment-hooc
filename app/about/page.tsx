import AboutSection from "@/components/AboutSection";
import AbSection2 from "@/components/AbSection2";
import AwardSection from "@/components/AwardsSection";
import CultureCarousel from "@/components/CultureCarousel";
import FooterSection from "@/components/FooterSection";
import TeamMosaicSection from "@/components/TeamMosaicSection";
import ValuesSection from "@/components/ValuesSection";

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <AbSection2 />
      <AwardSection/>
      <TeamMosaicSection/>
      <ValuesSection/>
      <CultureCarousel/>
      <FooterSection/>
    </>
  );
}