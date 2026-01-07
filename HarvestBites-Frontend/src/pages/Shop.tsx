// src/pages/Shop.tsx
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { products, comboPacks } from "@/data/products";
import type { Product } from "../types/product";
import { ShoppingBag, Star, Leaf } from "lucide-react";

// src/pages/Shop.tsx
export default function Shop() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Layout>
      {/* Products Grid */}
      <section className="py-10 bg-[#fffffe]">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-3xl font-semibold">Products</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {products.slice(0, 5).map((product, i) => (
              <div
                key={product.id}
                className="bg-card rounded-none overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/3] bg-white flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Leaf className="h-20 w-20 text-primary" />
                    )}
                  </div>
                </Link>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                      <Star className="h-3 w-3 fill-white" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.reviews} reviews
                    </span>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-foreground">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col gap-2">
                    <Button
                      className="w-full h-10 bg-gradient-to-b from-[#7b0000] to-[#b30000] hover:from-[#8c0000] hover:to-[#cc0000] text-white text-xs font-semibold tracking-wide rounded-none flex items-center justify-center gap-2"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Combo Products Grid */}
      <section className="py-10 bg-[#fffffe]">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-3xl font-semibold">Combo</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {comboPacks.map((product, i) => (
              <div
                key={`combo-${product.id}`}
                className="bg-card rounded-none overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/3] bg-white flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Leaf className="h-20 w-20 text-primary" />
                    )}
                  </div>
                </Link>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                      <Star className="h-3 w-3 fill-white" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.reviews} reviews
                    </span>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-foreground">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-col gap-2">
                    <Button
                      className="w-full h-10 bg-gradient-to-b from-[#7b0000] to-[#b30000] hover:from-[#8c0000] hover:to-[#cc0000] text-white text-xs font-semibold tracking-wide rounded-none flex items-center justify-center gap-2"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      ADD TO CART
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
