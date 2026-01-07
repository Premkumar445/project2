import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Leaf,
  ShoppingBag,
  User,
  Heart,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop Now", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, setIsCartOpen } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Top news / offer bar */}
<div className="w-full bg-gradient-to-b from-[#7b0000] to-[#b30000] text-white text-sm md:text-base">
  <div className="container mx-auto px-6 h-12 md:h-10 flex items-center justify-center overflow-hidden">
    <p className="whitespace-nowrap animate-[marquee_40s_linear_infinite] font-semibold">
      Free delivery for orders above ₹499 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      New millet cookie combo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      launched Limited‑time festival offers on family packs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Free delivery for orders above ₹499 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      New millet cookie combo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      launched Limited‑time festival offers on family packs
    </p>
  </div>
</div>



      {/* Main navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 text-emerald-900">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white transition-transform group-hover:scale-110">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-display text-2xl md:text-3xl font-semibold text-emerald-900">
                Harvest Bites
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative font-medium text-base md:text-lg transition-colors text-emerald-900 hover:text-emerald-700",
                    location.pathname === link.path
                      ? "underline underline-offset-4"
                      : ""
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Cart + Account */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 hover:bg-emerald-50 rounded-full transition-colors text-base font-medium text-emerald-900"
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-4 w-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
                <span>Cart</span>
              </button>

              {/* LOGIN vs MY ACCOUNT */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen((p) => !p)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors text-base font-medium text-emerald-900"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>
                        {user?.name?.[0] || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <span>My Account</span>
                  </button>

                  {isAccountOpen && (
                    <div
                      className="absolute right-0 mt-2 w-64 rounded-md border border-gray-200 bg-white text-emerald-900 shadow-xl text-sm overflow-hidden z-50"
                      onMouseLeave={() => setIsAccountOpen(false)}
                    >
                      <div className="h-1 bg-emerald-500" />
                      <div className="flex flex-col">
                        <Link
                          to="/account/profile"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-emerald-50 cursor-pointer"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <User className="h-4 w-4 text-emerald-500" />
                          <span>My Profile</span>
                        </Link>
                        
                        <button
                          type="button"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm" 
                  className="border-emerald-500 text-emerald-900 hover:bg-emerald-50"
                >
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>

            {/* Mobile Cart + Account + Menu */}
            <div className="flex md:hidden items-center gap-2">
              {/* Mobile Account */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsAccountOpen((p) => !p)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-emerald-50 transition-colors text-sm font-medium text-emerald-900"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>
                        {user?.name?.[0] || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  {isAccountOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white text-emerald-900 shadow-xl text-xs overflow-hidden z-50"
                      onMouseLeave={() => setIsAccountOpen(false)}
                    >
                      <div className="h-1 bg-emerald-500" />
                      <div className="flex flex-col">
                        <Link
                          to="/account/profile"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 cursor-pointer"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <User className="h-4 w-4 text-emerald-500" />
                          <span>My Profile</span>
                        </Link>
                        
                        <Link
                          to="/wishlist"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-emerald-50 cursor-pointer"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <Heart className="h-4 w-4 text-emerald-500" />
                          <span>Wishlist</span>
                        </Link>
                        <button
                          type="button"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 text-red-500 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm" 
                  className="px-3 py-1 border-emerald-500 text-emerald-900 hover:bg-emerald-50 text-sm"
                >
                  <Link to="/login">Login</Link>
                </Button>
              )}

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1 px-2 py-1 hover:bg-emerald-50 rounded-full transition-colors text-sm font-medium text-emerald-900"
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 h-4 w-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </div>
              </button>

              {/* Hamburger */}
              <button
                className="p-2 text-emerald-900"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile nav links */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "py-2 font-medium text-base transition-colors text-emerald-900 hover:text-emerald-700",
                      location.pathname === link.path
                        ? "underline underline-offset-4"
                        : ""
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button variant="secondary" className="mt-2 text-base" asChild>
                  <Link to="/shop" onClick={() => setIsOpen(false)}>
                    Shop Now
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
export default Navbar;