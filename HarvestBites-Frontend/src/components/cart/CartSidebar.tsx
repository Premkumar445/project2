import { Link } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, total, itemCount } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[420px] bg-background z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">Your Cart</h2>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button variant="outline" onClick={() => setIsCartOpen(false)} asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  {/* Product Image Placeholder */}
                  <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-sand to-muted flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🍪</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    <p className="text-primary font-semibold mt-1">₹{item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors ml-auto"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border space-y-4 bg-background">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-xl font-bold text-foreground">₹{total}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" asChild onClick={() => setIsCartOpen(false)}>
                <Link to="/cart">View Cart</Link>
              </Button>
              <Button variant="default" asChild onClick={() => setIsCartOpen(false)}>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
