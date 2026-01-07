import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { allProducts } from "@/data/products";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  Leaf,
  Check,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const numericId = Number(id);
  const product = allProducts.find((p) => p.id === numericId);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <button className="px-6 py-2 rounded-full bg-amber-500 text-white font-semibold">
            <Link to="/shop">Back to Shop</Link>
          </button>
        </div>
      </Layout>
    );
  }

  // gallery: main + extra thumbnails
  const images =
    product.images && product.images.length > 0
      ? [product.image, ...product.images]
      : [product.image];

  // 🔥 இங்கே மட்டும் மாற்றம்
  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        mode: "buynow",
        item: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
        },
      },
    });
  };

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-sand to-background">
        <div className="container mx-auto px-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main image */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-sand to-muted overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {images[selectedImage] ? (
                    <img
                      src={images[selectedImage] as string}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="h-48 w-48 rounded-full bg-primary/20 flex items-center justify-center">
                      <Leaf className="h-24 w-24 text-primary" />
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {product.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`flex-1 aspect-square rounded-xl bg-gradient-to-br from-sand to-muted flex items-center justify-center transition-all ${
                      selectedImage === i
                        ? "ring-2 ring-primary ring-offset-2"
                        : "hover:opacity-80"
                    }`}
                  >
                    {img ? (
                      <img
                        src={img as string}
                        alt={`${product.name} ${i + 1}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Leaf className="h-8 w-8 text-primary/50" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {product.benefit}
                </span>
                <h1 className="font-display text-4xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">
                  ₹{product.price}
                </span>
                <span className="text-muted-foreground">/ pack</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Quantity + Buy Now */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 rounded-full bg-background hover:bg-card flex items-center justify-center transition-colors"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-12 w-12 rounded-full bg-background hover:bg-card flex items-center justify-center transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                {/* BUY NOW – direct checkout with state */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 h-14 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold shadow-md hover:opacity-90 transition"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  "No Maida",
                  "No Refined Sugar",
                  "No Preservatives",
                  "FSSAI Certified",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              {product.ingredients && (
                <div className="pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutrition */}
              {product.nutrition && (
                <div className="pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Nutritional Highlights
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {product.nutrition.map((item) => (
                      <div key={item.label} className="text-center">
                        <p className="text-lg font-bold text-primary">
                          {item.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
