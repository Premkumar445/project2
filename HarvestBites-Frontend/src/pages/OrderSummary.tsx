// src/pages/OrderSummary.tsx - ✅ COMPLETE FIXED CODE (All Errors Solved)
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle,
  Truck,
  CreditCard,
  Phone,
  MapPin,
  Package,
  Clock,
  User,
  Home,
  Mail,
  ChevronRight,
} from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  flatNo: string;
  apartmentName: string;
  floorNumber: string;
  streetArea: string;
  landmark: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface OrderData {
  form: CheckoutForm;
  paymentMethod: string;
  subtotal: number;
  total: number;
  visibleItems: CartItem[];
  couponDiscount: number;
  locationCoords?: {
    lat: number | null;
    lng: number | null;
  };
}

export default function OrderSummary() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ FIXED: Extract displayAddress from orderData
  const displayAddress = orderData?.form;

  useEffect(() => {
    const stateOrderData = (location.state as any)?.orderSummary;
    const localOrderData = localStorage.getItem("current_order_summary");
    
    let data: OrderData | null = null;
    
    if (stateOrderData) {
      data = stateOrderData;
    } else if (localOrderData) {
      try {
        data = JSON.parse(localOrderData);
      } catch {
        data = null;
      }
    }
    
    setOrderData(data);
    setIsLoading(false);
  }, [location.state]);

  const handleProceedToPayment = async () => {
    if (!orderData || !orderData.total || isNaN(orderData.total)) {
      toast({
        title: "Error",
        description: "Order total not available. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    const processingToast = toast({
      title: "🔄 Processing Payment...",
      description: "Please wait while we secure your payment",
    });

    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const transactionId = `TXN${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
    const orderNumber = `HB${Math.floor(100000 + Math.random() * 900000)}`;
    
    const mockOrder = {
      id: orderNumber,
      orderNumber,
      transactionId,
      date: new Date().toISOString(),
      status: orderData.paymentMethod === 'razorpay' ? 'paid' : 'pending',
      total: orderData.total,
      items: orderData.visibleItems.length,
      details: orderData.visibleItems,
      customer: {
        firstName: orderData.form.firstName,
        lastName: orderData.form.lastName,
        phone: orderData.form.phone,
        email: orderData.form.email,
        flatNo: orderData.form.flatNo,
        apartmentName: orderData.form.apartmentName,
        floorNumber: orderData.form.floorNumber,
        streetArea: orderData.form.streetArea,
        landmark: orderData.form.landmark,
        address: orderData.form.address,
        city: orderData.form.city,
        state: orderData.form.state,
        pincode: orderData.form.pincode,
      },
      paymentMethod: orderData.paymentMethod
    };

    if (processingToast && typeof processingToast.dismiss === 'function') {
      processingToast.dismiss();
    }
    
    toast({
      title: "✅ Payment Successful!",
      description: `Order #${orderNumber} placed successfully. Transaction ID: ${transactionId.slice(-8)}`,
    });

    localStorage.setItem('recent_order', JSON.stringify(mockOrder));
    setIsLoading(false);
    
    navigate("/order-success", { 
      state: { 
        order: mockOrder,
        from: 'order-summary'
      } 
    });
  };

  const handleBackToCheckout = () => {
    navigate("/checkout");
  };

  if (isLoading || !orderData || !orderData.total) {
    return (
      <Layout>
        <div className="min-h-screen old-paper-bg py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-6 shadow-2xl"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLoading ? "Securing Payment" : "Loading Order"}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {isLoading && orderData?.total
                ? `Processing your payment of ₹${orderData.total.toLocaleString()}`
                : "Preparing your order summary..."
              }
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-xs text-gray-400 mt-8">
              {isLoading ? "Demo payment - No charges applied 🔒" : "Please wait..."}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>{`
        .old-paper-bg {
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #fdf4e5 0%, #f8e9d2 25%, #f0e6d0 50%, #e8d9c2 75%, #ddd2b8 100%);
        }
      `}</style>
      
      <div className="old-paper-bg min-h-screen py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Success Banner */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 mb-8 p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order Confirmed!</h2>
                  <p className="text-sm text-gray-600">Order preview • {orderData.visibleItems.length} {orderData.visibleItems.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-orange-600 font-medium bg-orange-50 px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4" />
                <span>Est. delivery: 2-4 days</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column - Products & Address */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Order Items */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <Package className="w-8 h-8 text-orange-600" />
                    Your Items ({orderData.visibleItems.length})
                  </h3>
                </div>

                <div className="space-y-4">
                  {orderData.visibleItems.map((item) => {
                    const imageUrl = item.image || 
                      `https://via.placeholder.com/120x120/6b7280/f8fafc?text=${encodeURIComponent(item.name.charAt(0))}`;
                    
                    return (
                      <div key={item.id} className="flex gap-4 p-4 hover:bg-gray-50/50 rounded-xl transition-colors">
                        <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 shadow-sm">
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/120x120/ef4444/f8fafc?text=${encodeURIComponent(item.name.charAt(0))}`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0 py-2">
                          <h4 className="font-semibold text-lg text-gray-900 leading-tight truncate mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-orange-600">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ✅ PERFECT DELIVERY ADDRESS SECTION - FIXED */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Truck className="w-6 h-6 text-green-600" />
                    Deliver to
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-orange-600 hover:bg-orange-50/50 h-9 px-4"
                    onClick={() => navigate(-1)}
                  >
                    Edit
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Home className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      {/* 👤 COMPLETE NAME */}
                      <p className="font-semibold text-lg text-gray-900">
                        {displayAddress?.firstName || ''} {displayAddress?.lastName || ''}
                      </p>
                      
                      {/* 🏠 COMPLETE FORMATTED ADDRESS */}
                      <p className="text-gray-700 leading-relaxed">
                        {`${displayAddress?.flatNo || ''}, ${displayAddress?.apartmentName || ''}${displayAddress?.floorNumber ? `, ${displayAddress.floorNumber}` : ''}`}
                        <br />
                        {displayAddress?.streetArea || ''}, {displayAddress?.address || ''}
                        <br />
                        {displayAddress?.landmark ? `Near ${displayAddress.landmark}` : ''}
                      </p>
                      
                      {/* 📍 CITY, STATE, PINCODE */}
                      <p className="text-sm text-gray-600">
                        {displayAddress?.city || ''}, {displayAddress?.state || ''} - {displayAddress?.pincode || ''}
                      </p>
                      
                      {/* 📞 PHONE + 📧 EMAIL */}
                      <div className="flex items-center gap-4 mt-2 pt-2 border-t border-blue-100">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{displayAddress?.phone || ''}</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{displayAddress?.email || ''}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Price & Payment */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Price Breakdown */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-6 sticky top-6">
                <h4 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  Price Details
                </h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Price ({orderData.visibleItems.length} item{orderData.visibleItems.length !== 1 ? 's' : ''})</span>
                    <span className="font-semibold">₹{orderData.subtotal?.toLocaleString() || orderData.total.toLocaleString()}</span>
                  </div>
                  {orderData.couponDiscount && orderData.couponDiscount > 0 && (
                    <div className="flex justify-between py-2 text-green-600 font-semibold">
                      <span>Discount</span>
                      <span>-₹{orderData.couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 text-gray-700">
                    <span>Delivery Charges</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                </div>

                <div className="border-t-2 border-orange-200 pt-4 mb-6">
                  <div className="flex justify-between items-center text-2xl font-extrabold text-gray-900 pb-1">
                    <span>Total Amount</span>
                    <span>₹{orderData.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-orange-50/50 border border-orange-200/50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-orange-800 font-medium mb-1">You will save ₹{orderData.couponDiscount || 0} on this order</p>
                  <div className="w-full bg-orange-200/50 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-orange-600" />
                    Payment
                  </h4>
                </div>

                <div className="mb-6 pb-4 border-b border-gray-100">
                  <div className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${
                    orderData.paymentMethod === 'razorpay' 
                      ? 'bg-blue-50/50 border-2 border-blue-200/50' 
                      : 'bg-green-50/50 border-2 border-green-200/50'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      orderData.paymentMethod === 'razorpay' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {orderData.paymentMethod === 'razorpay' ? (
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Truck className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">
                        {orderData.paymentMethod === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderData.paymentMethod === 'razorpay' 
                          ? 'Pay securely with UPI, Cards & Wallets' 
                          : `Pay ₹${orderData.total.toLocaleString()} to delivery partner`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={isLoading}
                    className={`w-full h-14 text-lg font-bold shadow-xl rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 ${
                      isLoading 
                        ? 'bg-orange-400 cursor-not-allowed' 
                        : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6 mr-2" />
                        Pay ₹{orderData.total.toLocaleString()} Now
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBackToCheckout}
                    disabled={isLoading}
                    className="w-full h-12 text-lg font-semibold border-2 border-gray-300 hover:bg-gray-50/50 rounded-xl"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Edit Order Details
                  </Button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center space-y-1">
                  <p>Safe and Secure Payments ✅ Easy Returns ✅ Free Delivery</p>
                  <p className="text-orange-600 font-medium">100% Purchase Protection • HarvestBites Guarantee</p>
                  <p className="text-xs mt-4 text-gray-400">Demo payment - No charges applied 🔒</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
