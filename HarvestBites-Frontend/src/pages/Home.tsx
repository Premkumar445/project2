// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Leaf, Star, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";

// ----- banners data -----
import banner1 from "@/assets/banners/banner1.png";
import banner2 from "@/assets/banners/banner2.png";
import banner3 from "@/assets/banners/banner3.png";

const banners = [banner1, banner2, banner3];

// ----- category images -----
import brainImg from "@/assets/categories/brain.png";
import bornImg from "@/assets/categories/born.png";
import heartImg from "@/assets/categories/heart.png";
import healthyImg from "@/assets/categories/healthy.png";
import WomenImg from "@/assets/categories/Women.png";

const categories = [
  { name: "Bone", image: brainImg },
  { name: "Brain", image: bornImg },
  { name: "Gut", image: heartImg },
  { name: "Heart", image: healthyImg },
  { name: "Pcos", image: WomenImg },
];

const features = [
  "No maida or refined sugar",
  "Ancient millet grains",
  "Traditional recipes",
  "FSSAI‑compliant",
  "No added preservatives",
  "Handcrafted in small batches",
];

const benefits = [
  {
    icon: ArrowRight,
    title: "Growing Minds",
    audience: "Children",
    description:
      "Steady energy for developing brains, without sugar spikes. Iron, fibre, and key micronutrients from ancient millets.",
    color: "text-terracotta",
  },
  {
    icon: ArrowRight,
    title: "Strong Foundations",
    audience: "Adults",
    description:
      "Naturally occurring minerals from millets to support bone health as part of everyday food habits.",
    color: "text-forest",
  },
  {
    icon: ArrowRight,
    title: "Digestive Balance",
    audience: "All Ages",
    description:
      "Dietary fibre that supports gut balance—the base for comfortable digestion, stable energy, and day‑to‑day wellness.",
    color: "text-golden-dark",
  },
  {
    icon: ArrowRight,
    title: "Steady Heart",
    audience: "Adults",
    description:
      "Fibre‑rich, lower refined‑carb choices that fit into calm, consistent, heart‑friendly eating patterns.",
    color: "text-accent",
  },
];

function Home() {
  const [bannerIndex, setBannerIndex] = useState(0);

  const prevBanner = () => {
    setBannerIndex((i) => (i === 0 ? banners.length - 1 : i - 1));
  };

  const nextBanner = () => {
    setBannerIndex((i) => (i === banners.length - 1 ? 0 : i + 1));
  };

  // Auto slide – 5 seconds once
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product: (typeof products)[number]) => {
    console.log("Add to cart:", product.id);
  };

  return (
    // FULL PAGE BACKGROUND – now plain white
    <Layout className="min-h-screen bg-white">
      {/* Banner carousel – 60–80vh height */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="w-full h-[60vh] sm:h-[80vh] lg:h-[84vh] relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={prevBanner}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-r-full bg-white/90 text-gray-800 shadow hover:bg-white transition absolute left-2 top-1/2 -translate-y-1/2 z-20"
          >
            <span className="text-lg">&lt;</span>
          </button>

          {/* Banner image */}
          <img
            src={banners[bannerIndex]}
            alt={`Banner ${bannerIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          />

          {/* Right arrow */}
          <button
            type="button"
            onClick={nextBanner}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-l-full bg-white/90 text-gray-800 shadow hover:bg-white transition absolute right-2 top-1/2 -translate-y-1/2 z-20"
          >
            <span className="text-lg">&gt;</span>
          </button>
        </div>
      </section>

      

      {/* Categories – image screenshot style */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 space-y-2">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Browse by Categories
            </h2>
          </div>

          {/* Single row – all 5 categories */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/shop"
                className="group cursor-pointer flex flex-col items-center flex-1 min-w-[200px] max-w-[220px]"
              >
                <div className="relative w-60 h-60 md:w-64 md:h-64 overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 bg-white">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-emerald-400 pointer-events-none" />
                </div>

                <p className="mt-4 text-base md:text-lg font-semibold text-slate-800 text-center leading-tight">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* Products Grid */}
<section className="py-10 bg-white">
  <div className="container mx-auto px-4">
    <h1 className="mb-6 text-3xl font-semibold text-center">
      Latest Products
    </h1>
    <br></br>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
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

          <div className="p-3 space-y-2">
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

            <div className="mt-2 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full rounded-none bg-gradient-to-b from-[#7b0000] to-[#b30000] text-white border-none hover:from-[#8c0000] hover:to-[#cc0000]"
                size="sm"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Begin your HarvestBites routine
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Choose a blend that matches your family's needs and make it a
              small, repeatable part of every day.
            </p>
            <Button variant="golden" size="lg" asChild>
              <Link to="/shop">
                Explore our collection
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
