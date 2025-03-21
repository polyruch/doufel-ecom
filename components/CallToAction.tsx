import Link from "next/link";
import { Button } from "./ui/button";

function CallToAction() {
  return (
    <section className="text-center bg-gradient-to-r from-pink-50 to-pink-100 py-8 sm:py-12 md:py-16 rounded-lg px-6 shadow-md mx-4 my-8 border border-pink-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-wide text-pink-800 mb-4 relative inline-block">
          <span className="relative z-10">Discover Our Collection</span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-pink-300 opacity-50"></span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-zinc-700 mb-8 max-w-xl mx-auto">
          Explore our wide range of stylish and comfortable women&apos;s
          clothing designed to make you shine.
        </p>
        <Button
          asChild
          className="bg-pink-700 hover:bg-pink-600 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-none transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 uppercase tracking-wide"
        >
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </section>
  );
}

export default CallToAction;
