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
                old_price: product.price * 2,
                isNew: true,
              }))
              .slice(-2)
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
    <section className="py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-light tracking-wide uppercase">
            {title}
          </h2>
          <Link
            href={"/hello"}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

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
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
