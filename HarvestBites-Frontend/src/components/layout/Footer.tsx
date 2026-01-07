import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-earth">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-semibold">
                Harvest Bites
              </span>
            </Link>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              Bringing back the wisdom of ancient millets, shaped for modern lives.
              Daily nutrition rooted in Indian tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Shop Now", path: "/shop" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "FAQ", path: "/faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies – new column */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold uppercase tracking-wide">
              Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Terms &amp; Condition
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation-refund-policy"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Cancellation &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:jothiprasad@harvestbites.in" className="hover:text-primary">
                  jothiprasad@harvestbites.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/80">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98865 44997</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/80">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Hosur, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social + bottom bar */}
        <div className="mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social */}
            <div className="space-y-3">
              <p className="text-sm text-secondary-foreground/80">
                Join our community for recipes, wellness tips, and more.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 text-secondary-foreground hover:bg-primary hover:text-earth transition-all"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right space-y-1">
              <p className="text-sm text-secondary-foreground/60">
                © 2024 Harvest Bites. All rights reserved.
              </p>
              <p className="text-sm text-secondary-foreground/60 italic font-display">
                "HarvestBites – A Daily Food Ritual for Lifelong Health"
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
