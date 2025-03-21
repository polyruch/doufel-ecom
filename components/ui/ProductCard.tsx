import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

interface Product {
  documentId: string;
  title: string;
  price: number;
  image: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.documentId}`} className="block">
      <Card className="h-full overflow-hidden p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-pink-100 hover:text-pink-700 transition-colors"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-pink-700 text-white text-xs px-2 py-0.5 rounded">
              New
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-light text-sm leading-tight mb-1 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">${product.price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground line-through">
              ${(product.price * 1.3).toFixed(2)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs hover:bg-pink-700 hover:text-white hover:border-pink-700 transition-colors "
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
