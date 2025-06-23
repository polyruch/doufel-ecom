"use client";
import { Metadata } from "next";
import { getProducts } from "@/utils/axiosClient";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/components/FeaturedProducts";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response.data) {
          setProducts(
            response.data.map((product: Product) => ({
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.banner.url,
              documentId: product.documentId,
              category: "Ensemble",
              old_price: product.price * 2,
              isNew: Math.random() > 0.7, // Randomly mark some products as new
            }))
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
    <div className="py-5 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto mt-5">
        <div className="mb-10">
          <h1 className="text-3xl font-light tracking-wide uppercase relative after:content-[''] after:absolute after:w-12 after:h-0.5 after:bg-pink-700 after:-bottom-3 after:left-0">
            Tous les produits
          </h1>
          <p className="text-sm text-gray-600 mt-6">
            Découvrez notre collection de vêtements de qualité
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="space-y-3">
                <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {!isLoading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
