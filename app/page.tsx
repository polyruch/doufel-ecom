import Banner from "@/components/Banner";
import FaqSection from "@/components/Faq";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import TextSlider from "@/components/TextSlider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <div className="relative z-10 flex flex-col min-h-screen">
        <HeroSection />
        <TextSlider />
        <FeaturedProducts title="Nouveautés" />
        {/* <CallToAction /> */}
        <FaqSection />
      </div>
    </div>
  );
}
