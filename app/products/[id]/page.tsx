"use client";
import { getProduct } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  colors: string[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCart();
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(params.id);
        setProduct({
          id: response?.id || "",
          name: response?.title || "Untitled Product",
          price: response?.price || 0,
          description:
            response?.description?.[0]?.children?.[0]?.text ||
            "No description available",
          images: [
            response?.banner?.url,
            ...(response?.images?.map((img: { url: string }) => img?.url) ||
              []),
          ].filter(Boolean),
          colors: response?.colors || [],
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) fetchProduct();
  }, [params.id]);

  // Update current slide when carousel changes
  React.useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    carouselApi.on("select", onSelect);
    // Call once to set initial slide
    onSelect();

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0] || "/placeholder.svg",
      });
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mt-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-16 px-4 md:px-6 text-center">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <Carousel className="w-full" setApi={setCarouselApi}>
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-between items-center mt-4">
              <div className="flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className="w-2.5 h-2.5 rounded-full transition-colors duration-200 focus:outline-none"
                    style={{
                      backgroundColor: `rgba(0, 0, 0, ${
                        index === currentSlide ? "1" : "0.3"
                      })`,
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <CarouselPrevious className="h-9 w-9 rounded-full border-black text-black hover:bg-black" />
                <CarouselNext className="h-9 w-9 rounded-full border-black text-black hover:bg-black" />
              </div>
            </div>
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light tracking-wide">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <p className="text-2xl font-medium">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                ${(product.price * 1.3).toFixed(2)}
              </p>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p>{product.description}</p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "ring-2 ring-pink-700 ring-offset-2"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-fit">
              <button
                onClick={decrementQuantity}
                className="px-3 py-2 text-gray-600 hover:text-pink-700 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 text-center min-w-[3rem]">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-2 text-gray-600 hover:text-pink-700 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-8 py-6 bg-pink-700 hover:bg-pink-800 text-white mt-6 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-5 w-5" />
            Add to Cart
          </Button>

          {/* Additional Info */}
          <div className="pt-6 border-t border-gray-200 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">Shipping</h4>
                <p className="text-gray-600">
                  Free shipping on orders over $100
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Returns</h4>
                <p className="text-gray-600">Free 30-day returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
