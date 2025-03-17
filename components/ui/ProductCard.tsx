import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../FeaturedProducts";
import { ShoppingBag } from "lucide-react";

interface ProductCard {
  product: Product;
}

export function ProductCard({ product }: ProductCard) {
  return (
    <div className="group">
      <div className="relative mb-2">
        {/* Product Image Container */}
        <div className="relative overflow-hidden bg-gray-100">
          <Link href={`/products/${product.documentId}`}>
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* NEW Label */}
          {product.isNew && (
            <div className="absolute top-0 left-0 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-wider">
              New
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="absolute bottom-3 right-3">
            <button className="bg-white p-1.5 rounded-sm shadow-sm hover:bg-gray-50 transition-colors">
              <ShoppingBag size={18} className="text-gray-800" />
              <span className="sr-only">Add to cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <Link href={`/products/${product.documentId}`} className="block">
        <div className="text-center space-y-1">
          {product.category && (
            <p className="text-[10px] uppercase tracking-wider text-gray-500">
              {product.category}
            </p>
          )}
          <h3 className="text-sm uppercase tracking-wider text-gray-800 font-medium">
            {product.title}
          </h3>
          <div className="flex justify-center items-center gap-2">
            <p className="font-medium text-sm">{product.price.toFixed(2)} DA</p>
            <p className="text-gray-500 line-through text-xs">
              {product.old_price.toFixed(2)} DA
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
