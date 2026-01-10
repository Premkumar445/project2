import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Razorpay global type
declare global {
  interface Window {
    Razorpay: any;
  }
}

type PaymentMethod = "upi" | "card" | "emi" | "cod";

export default function RazorpayCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const [method, setMethod] = useState<PaymentMethod>("upi");

  useEffect(() => {
    if (!orderData) navigate("/order-summary");
  }, [orderData, navigate]);

  const openRazorpay = async () => {
    const res = await fetch("http://127.0.0.1:8000/create-razorpay-order/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: orderData.total }),
    });

    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: "HarvestBites",
      description: "Complete Payment",
      order_id: data.order_id,
      handler: (response: any) => {
        navigate("/order-success", {
          state: {
            paymentId: response.razorpay_payment_id,
            order: orderData,
          },
        });
      },
      prefill: {
        name: `${orderData.form.firstName} ${orderData.form.lastName}`,
        email: orderData.form.email,
        contact: orderData.form.phone,
      },
      theme: { color: "#2874f0" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">

            {/* LEFT – PAYMENT METHODS */}
            <aside className="lg:col-span-3 border-b lg:border-b-0 lg:border-r flex flex-col">
              <div className="p-4 font-semibold border-b text-base lg:text-lg">
                Complete Payment
              </div>

              <div className="p-3 sm:p-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible flex-1">
                {[
                  { key: "upi", label: "UPI" },
                  { key: "card", label: "Card" },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMethod(m.key as PaymentMethod)}
                    className={`min-w-[120px] lg:min-w-full px-4 py-3 rounded-md transition text-sm sm:text-base ${
                      method === m.key
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 bg-gray-50"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}

                <button
                  disabled
                  className="min-w-[160px] lg:min-w-full px-4 py-3 rounded-md text-gray-400 bg-gray-100 cursor-not-allowed text-sm"
                >
                  Cash on Delivery
                </button>
              </div>
            </aside>

            {/* CENTER – PAYMENT FORM (NO EMPTY SPACE) */}
            <main className="lg:col-span-6 p-4 sm:p-6 lg:p-8 border-r flex flex-col">
              <div className="flex-1 flex items-start pt-6">
                <div className="w-full max-w-lg">

                  {method === "upi" && (
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-semibold">
                        Pay using UPI
                      </h3>

                      <Input
                        placeholder="Enter your UPI ID"
                        className="h-12"
                      />

                      <Button
                        variant="outline"
                        className="w-full h-12"
                      >
                        Verify UPI
                      </Button>
                    </div>
                  )}

                  {method === "card" && (
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-semibold">
                        Card Details
                      </h3>

                      <Input placeholder="Card Number" className="h-12" />

                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="MM / YY" className="h-12" />
                        <Input placeholder="CVV" className="h-12" />
                      </div>

                      <Input
                        placeholder="Card Holder Name"
                        className="h-12"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* PAY BUTTON FIXED AT BOTTOM */}
              <Button
                onClick={openRazorpay}
                className="w-full h-14 text-base sm:text-lg mt-6"
              >
                Pay ₹{orderData.total}
              </Button>
            </main>

            {/* RIGHT – PRICE DETAILS */}
            <aside className="lg:col-span-3 p-4 sm:p-6 border-t lg:border-t-0 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-base sm:text-lg mb-4">
                  Price Details
                </h3>

                <div className="flex justify-between text-sm mb-2">
                  <span>Items Price</span>
                  <span>₹{orderData.total - 7}</span>
                </div>

                <div className="flex justify-between text-sm mb-2">
                  <span>Platform Fee</span>
                  <span>₹7</span>
                </div>

                <div className="flex justify-between font-semibold border-t pt-3 mt-3">
                  <span>Total Amount</span>
                  <span className="text-blue-600">
                    ₹{orderData.total}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Safe and secure payments powered by Razorpay
              </p>
            </aside>

          </div>
        </div>
      </div>
    </Layout>
  );
}
