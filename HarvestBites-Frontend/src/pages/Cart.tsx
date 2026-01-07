// src/pages/Cart.tsx
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { 
  Plus, Minus, Trash2, ShoppingBag, ArrowRight, 
  Truck, Gift, Sparkles, Package, CheckCircle,
  Clock, CreditCard
} from "lucide-react";
import { allProducts } from "@/data/products";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();

  const getProductImage = (itemId: number) => {
    const product = allProducts.find((p) => p.id === itemId);
    return product?.image || "https://via.placeholder.com/160x160/F5F5F7/000000?text=BISCUIT";
  };

  const handleQuantityChange = (itemId: number, newQty: number) => {
    if (newQty < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQty);
    }
  };

  const discount = items.reduce((sum, item) => sum + (item.price * 0.15 * item.quantity), 0);
  const savings = 50 + Math.round(discount); // Free delivery + platform discount

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Amazon-style Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="flex items-center justify-between py-4 px-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ShoppingBag className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart ({items.length} items)</h1>
                  
                </div>
              </div>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-red-300 text-red-700 hover:bg-red-50 font-semibold px-6 py-2 h-11 rounded-md shadow-sm hover:shadow-md"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              )}
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-24 max-w-3xl mx-auto">
              <div className="w-48 h-48 mx-auto mb-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-xl">
                <ShoppingBag className="h-24 w-24 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                You have no items in your shopping cart. Head over to our store and start shopping!
              </p>
              <div className="space-y-4 max-w-md mx-auto">
                <Button asChild size="lg" className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-xl font-bold shadow-lg">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 gap-8 mt-8">
              {/* Cart Items - 3 Column */}
              <div className="lg:col-span-3 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="group bg-white border border-gray-200 rounded-2xl hover:shadow-2xl hover:border-orange-300 transition-all duration-300 overflow-hidden">
                    {/* Product Row */}
                    <div className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-6 lg:gap-8">
                        {/* Product Image */}
                        <div className="relative w-32 h-32 lg:w-36 lg:h-36 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 group-hover:scale-105 transition-all duration-300">
                          <img
                            src={getProductImage(item.id)}
                            alt={item.name}
                            className="w-full h-full object-cover hover:brightness-105 transition-all"
                          />
                          <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1">
                            In Stock
                          </Badge>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0 py-2">
                          <Link
                            to={`/product/${item.id}`}
                            className="block text-lg lg:text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors mb-2 line-clamp-2 hover:underline"
                          >
                            {item.name}
                          </Link>
                          
                          <div className="flex items-center gap-3 mb-4 text-sm">
                            <Sparkles className="h-4 w-4 text-yellow-500" />
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                              {item.benefit || 'Premium Quality'}
                            </span>
                            <span className="text-gray-600">{item.subtitle || 'Crispy & Delicious'}</span>
                          </div>

                          {/* Price & Quantity */}
                          <div className="flex items-center justify-between gap-6">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-100 rounded-full p-1.5 group/quantity hover:bg-gray-200 transition-all">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="w-12 h-12 rounded-xl bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 flex items-center justify-center transition-all duration-200 text-gray-700 hover:text-orange-600 hover:scale-105 shadow-sm"
                              >
                                <Minus className="h-5 w-5" />
                              </button>
                              <span className="px-6 py-3 mx-2 font-bold text-lg text-gray-900 min-w-[4rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="w-12 h-12 rounded-xl bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 flex items-center justify-center transition-all duration-200 text-gray-700 hover:text-orange-600 hover:scale-105 shadow-sm"
                              >
                                <Plus className="h-5 w-5" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right min-w-[140px]">
                              <div className="text-2xl lg:text-3xl font-bold text-orange-600 mb-1">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </div>
                              <div className="text-lg font-normal text-gray-500 line-through">
                                ₹{Math.round(item.price * 1.25 * item.quantity).toLocaleString()}
                              </div>
                              <Badge className="mt-1 bg-orange-100 text-orange-800 px-3 py-1 text-sm font-bold">
                                {Math.round(item.price * 0.25 * item.quantity)}% OFF
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-400 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100 lg:opacity-100 z-10"
                        >
                          <Trash2 className="h-6 w-6 text-red-500 hover:text-red-600 transition-colors" />
                        </button>
                      </div>
                    </div>

                    {/* Product Footer */}
                    <div className="px-6 pb-6 pt-4 border-t border-gray-200 bg-gray-50">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-gray-600">
                          <Truck className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Free Delivery by Tomorrow</span>
                        </div>
                        <Link to={`/product/${item.id}`} className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                          View Item Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amazon Order Summary */}
              <div className="lg:col-span-1 lg:sticky lg:top-40 self-start">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                    Order Summary
                  </h3>

                  {/* Price Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-lg font-semibold text-gray-700">
                        Items {items.length}:
                      </span>
                      <span className="text-xl font-bold text-gray-900">₹{total.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <span className="text-green-700 font-semibold flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Delivery
                      </span>
                      <Badge className="bg-green-500 text-white font-bold px-4 py-2 shadow-md">
                        FREE
                      </Badge>
                    </div>

                    
                  </div>

                  {/* Total */}
                  <div className="border-t-2 border-orange-400 pt-6 mb-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                    <div className="flex justify-between items-center text-3xl font-extrabold text-gray-900">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                    
                  </div>

                  {/* Primary CTA */}
                  <Button
                    asChild
                    className="w-full h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-xl font-bold text-white shadow-2xl hover:shadow-3xl rounded-xl border-0 transition-all duration-300 transform hover:-translate-y-1 mb-6"
                  >
                    <Link to="/checkout" className="flex items-center justify-center gap-3">
                      Proceed to Checkout
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>

                  

                  {/* Trust Signals */}
                  <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-600 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Orders eligible for Return & Refund</span>
                    </div>
                    <p className="text-gray-500">Secure Transaction • EMI Available • Free Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
