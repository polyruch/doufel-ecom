import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import TextSlider from "@/components/TextSlider";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <HeroSection />
      <TextSlider />
      <div className="container mx-auto px-4 py-8 flex-grow max-w-full">
        <FeaturedProducts />
      </div>
    </div>
  );
}
