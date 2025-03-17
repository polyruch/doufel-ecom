import { ProductCard } from "./ui/ProductCard";

interface ProductGridProps {
  products: Array<{
    id: string;
    documentId: string;
    title: string;
    price: number;
    oldPrice: number;
    image: string;
    category?: string;
    isNew?: boolean;
  }>;
  isLoading?: boolean;
  title?: string;
}

export function ProductGrid({
  products,
  isLoading = false,
  title = "NOTRE COLLECTION",
}: ProductGridProps) {
  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-serif text-center uppercase mb-10 tracking-wider text-gray-800">
          {title}
        </h2>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
