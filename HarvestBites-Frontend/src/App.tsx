import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Profile from "@/pages/account/Profile";
import Orders from "@/pages/account/Orders";
import Wishlist from "@/pages/account/Wishlist";
import SignUpPage from "./pages/SignUpPage";      
import RegisterDetails from "./pages/RegisterDetails";
import LoginPage from "./pages/LoginPage";  
import OrderSummary from "./pages/OrderSummary"; 
import OrderSuccess from "./pages/OrderSuccess";
import OrderTracking from "./pages/OrderTracking";
    
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />

              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />  
              <Route path="/register/details" element={<RegisterDetails />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              

              {/* Account routes */}
              <Route path="/account/profile" element={<Profile />} />
              <Route path="/account/orders" element={<Orders />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/track-order/:orderId" element={<OrderTracking />} />

              {/* /shop-now → /shop redirect */}
              <Route path="/shop-now" element={<Navigate to="/shop" replace />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster />
          <Sonner />
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
