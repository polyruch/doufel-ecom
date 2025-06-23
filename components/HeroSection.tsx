"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center px-4 my-3">
      <div className="max-w-s md:max-w-2xl mx-auto text-center space-y-6 ">
        <h1 className="text-3xl md:text-4xl font-serif tracking-wide leading-tight mt-5 text-zinc-700">
          QUALITY CLOTHES FOR EVERY WOMAN
        </h1>
        <p className="text-sm md:text-base leading-relaxed max-w-xl mx-auto">
          Will satisfy you no matter your style, we provide for you high quality
          unique models to make sure you&apos;ll shine!
        </p>
        <Link href="/products">
          <Button
            className="font-sans bg-pink-700 rounded-none text-white"
            size="lg"
          >
            Découvrez nos produits
          </Button>
        </Link>
      </div>
    </div>
  );
}
