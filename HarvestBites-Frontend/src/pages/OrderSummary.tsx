import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  CheckCircle,
  Truck,
  CreditCard,
  Package,
  Phone,
  Mail,
  Home,
} from "lucide-react";

/* ---------------- TYPES ---------------- */

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
  paymentMethod: "razorpay" | "cod";
  subtotal: number;
  total: number;
  visibleItems: CartItem[];
  couponDiscount: number;
}

/* ---------------- COMPONENT ---------------- */

export default function OrderSummary() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  /* -------- LOAD ORDER DATA -------- */
  useEffect(() => {
    const stateData = (location.state as any)?.orderSummary;
    const localData = localStorage.getItem("current_order_summary");

    const data = stateData || (localData ? JSON.parse(localData) : null);

    setOrderData(data);
    setLoading(false);
  }, [location.state]);

  /* -------- PAY BUTTON (UPDATED) -------- */
  const handlePayNow = () => {
    if (!orderData) return;

    const orderNumber = `HB${Math.floor(100000 + Math.random() * 900000)}`;

    const order = {
      orderNumber,
      date: new Date().toISOString(),
      status:
        orderData.paymentMethod === "razorpay" ? "paid" : "pending",
      total: orderData.total,
      details: orderData.visibleItems,
      customer: orderData.form,
      paymentMethod: orderData.paymentMethod,
    };

    // Save order
    localStorage.setItem("recent_order", JSON.stringify(order));

    toast({
      title: "✅ Order Placed Successfully",
      description: `Order #${orderNumber} confirmed`,
    });

    // 👉 DIRECT ORDER SUCCESS PAGE
    navigate("/order-success", {
      state: { order },
    });
  };

  if (loading || !orderData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading order summary…</p>
          </div>
        </div>
      </Layout>
    );
  }

  const address = orderData.form;

  return (
    <Layout>
      <div className="min-h-screen bg-[#fdf6ec] py-8">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8">

          {/* ---------------- LEFT ---------------- */}
          <div className="lg:col-span-8 space-y-6">

            {/* ITEMS */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <Package className="text-orange-500" /> Order Items
              </h2>

              {orderData.visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b py-4 last:border-0"
                >
                  <img
                    src={
                      item.image ||
                      `https://via.placeholder.com/120?text=${item.name[0]}`
                    }
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      Qty {item.quantity} × ₹{item.price}
                    </p>
                    <p className="font-bold text-orange-600 text-xl">
                      ₹{item.quantity * item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ADDRESS */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Truck className="text-green-600" /> Delivery Address
              </h2>

              <div className="flex gap-4 bg-green-50 p-4 rounded-xl">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Home />
                </div>
                <div>
                  <p className="font-semibold text-lg">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-gray-700">
                    {address.flatNo}, {address.apartmentName},{" "}
                    {address.streetArea}, {address.city}
                  </p>
                  <p className="text-gray-600">
                    {address.state} – {address.pincode}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Phone size={14} /> {address.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={14} /> {address.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT ---------------- */}
          <div className="lg:col-span-4 space-y-6">

            {/* PRICE */}
            <div className="bg-white rounded-2xl shadow p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4">Price Details</h3>

              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{orderData.subtotal}</span>
                </div>

                {orderData.couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{orderData.couponDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between text-xl font-extrabold">
                <span>Total</span>
                <span>₹{orderData.total}</span>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <CreditCard className="text-orange-500" /> Payment Method
              </h3>

              <div className="bg-orange-50 p-4 rounded-xl mb-4">
                <p className="font-semibold">
                  {orderData.paymentMethod === "razorpay"
                    ? "Online Payment (Razorpay)"
                    : "Cash on Delivery"}
                </p>
                <p className="text-sm text-gray-600">
                  {orderData.paymentMethod === "razorpay"
                    ? "UPI • Cards • Wallets"
                    : "Pay when order arrives"}
                </p>
              </div>

              <Button
                onClick={handlePayNow}
                className="w-full h-14 text-lg font-bold bg-orange-500 hover:bg-orange-600"
              >
                <CheckCircle className="mr-2" />
                Pay ₹{orderData.total}
              </Button>

              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => navigate("/checkout")}
              >
                <ArrowLeft className="mr-2" /> Edit Order
              </Button>

              <p className="text-xs text-center text-gray-400 mt-4">
                100% Secure Payments • HarvesyBites
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
