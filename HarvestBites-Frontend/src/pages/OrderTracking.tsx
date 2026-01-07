// src/pages/OrderTracking.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Home,
  AlertCircle,
} from "lucide-react";

interface OrderStatus {
  id: number;
  status: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  completed: boolean;
}

interface OrderTrackingData {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  currentStatus: string;
  trackingNumber: string;
  carrier: string;
  totalAmount: number;
  shippingAddress: string;
  timeline: OrderStatus[];
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
}

export default function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderTrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - Replace with actual API call
    const fetchOrderTracking = () => {
      setTimeout(() => {
        // Get from localStorage or API
        const savedOrder = localStorage.getItem("recent_order");
        
        if (savedOrder) {
          const order = JSON.parse(savedOrder);
          
          const mockTrackingData: OrderTrackingData = {
            orderNumber: order.orderNumber || orderId || "HB123456",
            orderDate: new Date(order.date).toLocaleDateString('en-IN'),
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
            currentStatus: "Out for Delivery",
            trackingNumber: order.transactionId || "TXN123456789",
            carrier: "Blue Dart Express",
            totalAmount: order.total || 0,
            shippingAddress: `${order.customer?.address}, ${order.customer?.pincode}`,
            timeline: [
              {
                id: 1,
                status: "Order Placed",
                description: "Your order has been received",
                date: new Date().toLocaleDateString('en-IN'),
                time: "10:30 AM",
                location: "Hosur, Tamil Nadu",
                completed: true,
              },
              {
                id: 2,
                status: "Order Confirmed",
                description: "Seller has confirmed your order",
                date: new Date().toLocaleDateString('en-IN'),
                time: "11:15 AM",
                location: "Hosur, Tamil Nadu",
                completed: true,
              },
              {
                id: 3,
                status: "Shipped",
                description: "Your package is on the way",
                date: new Date().toLocaleDateString('en-IN'),
                time: "02:45 PM",
                location: "Chennai Hub",
                completed: true,
              },
              {
                id: 4,
                status: "Out for Delivery",
                description: "Package is out for delivery",
                date: new Date().toLocaleDateString('en-IN'),
                time: "09:00 AM",
                location: "Bangalore Delivery Center",
                completed: true,
              },
              {
                id: 5,
                status: "Delivered",
                description: "Package will be delivered soon",
                date: "Pending",
                time: "-",
                completed: false,
              },
            ],
            items: order.details || [],
          };
          
          setOrderData(mockTrackingData);
        }
        
        setIsLoading(false);
      }, 1000);
    };

    fetchOrderTracking();
  }, [orderId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center old-paper-bg">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tracking information...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!orderData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center old-paper-bg">
          <div className="text-center max-w-md mx-auto p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the tracking information for this order.</p>
            <Button onClick={() => navigate("/my-orders")} className="bg-orange-500 hover:bg-orange-600">
              View My Orders
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>{`
        .old-paper-bg {
          background: linear-gradient(135deg, #fdf4e5 0%, #f8e9d2 25%, #f0e6d0 50%, #e8d9c2 75%, #ddd2b8 100%);
        }
        
        .timeline-line {
          position: absolute;
          left: 20px;
          top: 40px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #22c55e 0%, #22c55e 50%, #e5e7eb 50%, #e5e7eb 100%);
        }
        
        .pulse-animation {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      <div className="old-paper-bg min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/my-orders")}
              className="mb-4"
            >
              ← Back to Orders
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-gray-600">Order #{orderData.orderNumber}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Tracking Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Status Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Current Status</h2>
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {orderData.currentStatus}
                  </span>
                </div>
                
                <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 pulse-animation">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{orderData.currentStatus}</p>
                      <p className="text-sm text-gray-600">Carrier: {orderData.carrier}</p>
                      <p className="text-sm text-gray-600">Tracking: {orderData.trackingNumber}</p>
                      <p className="text-sm text-green-600 font-medium mt-2">
                        Expected delivery: {orderData.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
                
                <div className="relative">
                  {orderData.timeline.map((item, index) => (
                    <div key={item.id} className="relative pb-8 last:pb-0">
                      {/* Timeline dot and line */}
                      <div className="relative flex items-start">
                        <div className="flex-shrink-0 relative z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.completed 
                              ? 'bg-green-500 shadow-lg shadow-green-200' 
                              : 'bg-gray-300'
                          }`}>
                            {item.completed ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <Clock className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                        </div>

                        {/* Vertical line */}
                        {index < orderData.timeline.length - 1 && (
                          <div className={`absolute left-5 top-10 w-0.5 h-full ${
                            item.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} style={{ transform: 'translateX(-1px)' }}></div>
                        )}

                        {/* Content */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`font-semibold ${
                                item.completed ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                {item.status}
                              </h3>
                              <p className={`text-sm ${
                                item.completed ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                {item.description}
                              </p>
                              {item.location && (
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {item.location}
                                </p>
                              )}
                            </div>
                            <div className="text-right text-sm">
                              <p className={`font-medium ${
                                item.completed ? 'text-gray-700' : 'text-gray-400'
                              }`}>
                                {item.date}
                              </p>
                              <p className={`text-xs ${
                                item.completed ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {item.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Order Details</h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Order Date</p>
                    <p className="font-semibold text-gray-900">{orderData.orderDate}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Order Total</p>
                    <p className="font-semibold text-gray-900">₹{orderData.totalAmount.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Shipping Address</p>
                    <p className="font-semibold text-gray-900">{orderData.shippingAddress}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Items ({orderData.items.length})</h3>
                
                <div className="space-y-3">
                  {orderData.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
                        <img 
                          src={item.image || `https://via.placeholder.com/48x48/6b7280/ffffff?text=${item.name.charAt(0)}`}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {orderData.items.length > 3 && (
                    <p className="text-sm text-gray-500">+{orderData.items.length - 3} more items</p>
                  )}
                </div>
              </div>

              {/* Help */}
              <div className="bg-orange-50/50 border border-orange-200/50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">Contact our support team</p>
                <div className="space-y-2 text-sm">
                  <a href="tel:+919876543210" className="flex items-center gap-2 text-orange-600 hover:text-orange-700">
                    <Phone className="w-4 h-4" />
                    +91 98765 43210
                  </a>
                  <a href="mailto:support@harvestbites.com" className="flex items-center gap-2 text-orange-600 hover:text-orange-700">
                    <Mail className="w-4 h-4" />
                    support@harvestbites.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
