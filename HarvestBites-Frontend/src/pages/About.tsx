// src/pages/About.tsx
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Users, Award, ArrowRight } from "lucide-react";
import { useState } from "react";
import aboutBanner from "@/assets/about/about-banner.png";
import journeyImg from "@/assets/about/journey.png";
import visionImg from "@/assets/about/vision.png";

const values = [
  {
    icon: Leaf,
    title: "Ancient Wisdom",
    description:
      "Drawing from centuries of Indian food tradition, where millets were the cornerstone of daily nutrition.",
  },
  {
    icon: Heart,
    title: "Functional Purpose",
    description:
      "Every ingredient serves a purpose—supporting brain health, bone strength, gut balance, and heart wellness.",
  },
  {
    icon: Users,
    title: "Family First",
    description:
      "Crafted for every member of your family, from growing children to health-conscious adults.",
  },
  {
    icon: Award,
    title: "Quality Promise",
    description:
      "FSSAI certified, made with premium millets, no maida, no refined sugar, no preservatives.",
  },
];

const timeline = [
  {
    year: "The Beginning",
    title: "Rediscovering Heritage",
    description:
      "It started in a grandmother's kitchen, where millet rotis and traditional snacks were everyday fare—not health food, just food.",
  },
  {
    year: "The Problem",
    title: "A Modern Disconnect",
    description:
      "We noticed how modern snacking had drifted far from nourishment—refined flours, excess sugar, empty calories disguised as treats.",
  },
  {
    year: "The Solution",
    title: "Harvest Bites is Born",
    description:
      "We set out to create snacks that could be eaten daily without guilt—functional foods that taste like home and work like wellness.",
  },
  {
    year: "Today",
    title: "Growing Together",
    description:
      "Now, thousands of families across India have made our millet cookies part of their daily routine—breakfast, tiffin, evening chai.",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<"vision" | "mission">("vision");

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-amber-50/90 via-yellow-50/80 to-orange-50/70">
        {/* Old Paper Texture Background */}
        <div className="fixed inset-0 opacity-3 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icGFwZXIiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4yIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iMSIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNwYXBlcikiLz48L3N2Zz4=')] pointer-events-none" />

        {/* Hero Banner */}
        <section className="w-full relative z-10">
          <div className="w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[350px]">
            <img src={aboutBanner} alt="Our story" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 relative z-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="font-display text-4xl md:text-3xl font-bold text-foreground">
                  About Bisk Farm
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg md:text-xl">
                  <p>
                    In traditional Indian households, food was never just about taste—it was medicine, it was love, it was daily care for the entire family. Grandmothers knew which grain to serve for what ailment, which spice would aid digestion, which seed would build strength.
                  </p>
                  <p>
                    Somewhere along the way, we lost this wisdom. Fast food replaced functional food. Convenience trumped nourishment. We started treating food as fuel and forgot that it could be so much more.
                  </p>
                  <p className="font-semibold text-foreground text-base md:text-lg">
                    Harvest Bites is our humble attempt to bring that wisdom back—one cookie at a time.
                  </p>
                </div>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/shop">
                    Explore Our Products <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* VIDEO PLAYER */}
              <div className="relative">
                <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden shadow-2xl">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&fit=crop"
                  >
                    <source src="/videos/about-video.mp4" type="video/mp4" />
                    <source src="/videos/about-video.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-8 h-8 text-primary ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE VISION/MISSION TABS - NO CARDS */}
        <section className="py-20 relative z-10 bg-white">
          <div className="container mx-auto px-4">
            {/* Interactive Tab Buttons */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center rounded-full bg-muted p-1">
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`px-5 py-2 text-xs md:text-sm rounded-full font-semibold transition-all duration-300 ${
                    activeTab === "vision"
                      ? "bg-emerald-700 text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Our Vision
                </button>
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`px-5 py-2 text-xs md:text-sm rounded-full font-semibold ml-1 transition-all duration-300 ${
                    activeTab === "mission"
                      ? "bg-emerald-700 text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Our Mission
                </button>
              </div>
            </div>

            {/* Tab Content - No Card */}
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                {activeTab === "vision" ? (
                  <>
                    <div className="space-y-5 text-center md:text-left">
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                        Our Vision
                      </h2>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        At Harvest Bites, our journey began with a simple idea: make mindful, millet‑based snacking easy for every home. From grandmother's kitchen wisdom to today's busy routines, we wanted snacks that feel like a treat and work like nourishment.
                      </p>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        Whether it is a child's tiffin box, an office tea break, or family chai‑time, our cookies are crafted to fit naturally into everyday life—without guilt, without compromise.
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <img
                        src={visionImg}
                        alt="Harvest Bites vision"
                        className="max-w-sm md:max-w-md w-full h-auto object-contain"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <img
                        src={journeyImg}
                        alt="Family enjoying Harvest Bites"
                        className="max-w-sm md:max-w-md w-full h-auto object-contain"
                      />
                    </div>
                    <div className="space-y-5 text-center md:text-left">
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                        Our Mission
                      </h2>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        At Harvest Bites, our mission is to bring back everyday, functional snacking made from ancient millets, in a form that today's families actually love to eat.
                      </p>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        From school tiffins to office breaks and evening chai, we want to make it effortless to choose something tasty that also cares for long‑term health.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 relative z-10 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Our Journey
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, i) => (
                <div key={item.year} className="relative pl-8 pb-12 last:pb-0">
                  {i !== timeline.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                      {item.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Cards */}
        <section className="py-20 relative z-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Our Core Values
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value) => (
                <div 
                  key={value.title} 
                  className="p-8 bg-white rounded-2xl shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
