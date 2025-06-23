"use client";
import { getProducts } from "@/utils/axiosClient";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ProductCard } from "./ui/ProductCard";

export interface Product {
  id: string;
  documentId: string;
  price: number;
  old_price: number;
  title: string;
  image: string;
  banner: { url: string };
  category: string;
  isNew?: boolean;
}

export default function FeaturedProducts({ title }: { title: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.data) {
          setProducts(
            response.data
              .map((product: Product) => ({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.banner.url,
                documentId: product.documentId,
                category: "Ensemble",
                old_price: product.old_price,
                isNew: true,
              }))
              .reverse()
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="pt-10 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-light tracking-wide uppercase relative after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-pink-700 after:-bottom-3 after:left-0">
            {title}
          </h2>
          <Link
            href={"/products"}
            className="flex items-center text-sm font-medium text-pink-700 hover:text-pink-900 transition-colors group"
          >
            Voir tous les produits
            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        )}

        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-6">
            <CarouselPrevious className="static transform-none h-9 w-9 rounded-full border-pink-200 text-pink-700 hover:bg-pink-50" />
            <CarouselNext className="static transform-none h-9 w-9 rounded-full border-pink-200 text-pink-700 hover:bg-pink-50" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
