// src/pages/Checkout.tsx - FIXED: Continue to Payment works perfectly
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";
import axios from "axios";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Stepper
  const [activeStep, setActiveStep] = useState(1);
  const steps = ["Contact", "Address", "Payment"];

  // Updated Form with complete address fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Complete Address Fields - MISSING FIELDS ADDED BACK
    flatNo: "",
    apartmentName: "",
    floorNumber: "",
    streetArea: "",
    landmark: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  // Buy Now state
  const buyNowState = location.state as
    | {
        mode?: string;
        item?: { 
          id: number; 
          name: string; 
          price: number; 
          quantity: number;
          image?: string;
        };
      }
    | undefined;

  const isBuyNow = buyNowState?.mode === "buynow";
  const buyNowItem = buyNowState?.item;
  const visibleItems = isBuyNow && buyNowItem ? [buyNowItem] : items;

  const subtotal = visibleItems.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );
  const total = Math.max(0, subtotal - couponDiscount);

  // FIXED VALIDATION - Added all missing fields
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return (
          form.firstName.trim().length > 1 &&
          form.lastName.trim().length > 0 &&
          form.email.includes("@") &&
          form.phone.trim().length >= 10
        );
      case 2:
        return (
          form.flatNo.trim().length > 0 &&
          form.apartmentName.trim().length > 0 &&
          form.floorNumber.trim().length > 0 &&
          form.streetArea.trim().length > 5 &&
          form.address.trim().length > 5 &&
          form.city.trim().length > 1 &&
          form.landmark.trim().length > 0 &&
          form.pincode.trim().length === 6
        );
      default:
        return true;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Pincode auto-fill
  const validatePincode = useCallback(
    async (pin: string) => {
      if (pin.length === 6) {
        try {
          const res = await axios.get(
            `https://api.postalpincode.in/pincode/${pin}`
          );
          if (res.data[0]?.Status === "Success") {
            const data = res.data[0].PostOffice[0];
            setForm((prev) => ({
              ...prev,
              city: data.District || data.Block,
              state: data.State,
            }));
            toast({
              title: "Address auto-filled",
              description: `${data.Block}, ${data.State}`,
            });
          } else {
            toast({
              title: "PIN not found",
              description: "Please check your pincode once.",
              variant: "destructive",
            });
          }
        } catch {
          toast({
            title: "Invalid PIN",
            description: "Could not validate pincode.",
            variant: "destructive",
          });
        }
      }
    },
    [toast]
  );

  // Geolocation auto-fill
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setForm((prev) => ({
          ...prev,
          flatNo: "Detected",
          apartmentName: "Current Location",
          streetArea: `Hosur Road Area (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`,
          address: `Near current location`,
          landmark: "GPS Location",
        }));
        toast({
          title: "Location detected",
          description: "Address fields auto-filled with GPS location.",
        });
      },
      () => {
        toast({
          title: "Location permission denied",
          description: "Please enable location to use this feature.",
          variant: "destructive",
        });
      }
    );
  };

  // Go to Order Summary Page (Step 4)
  const goToOrderSummary = () => {
    if (!isStepValid(activeStep)) {
      toast({
        title: "Missing details",
        description: "Please fill all required fields first.",
        variant: "destructive",
      });
      return;
    }

    const orderSummaryData = {
      form,
      paymentMethod,
      subtotal,
      total,
      visibleItems,
      couponDiscount,
      locationCoords,
    };

    navigate("/order-summary", { 
      state: { 
        orderSummary: orderSummaryData,
        fromCheckout: true 
      } 
    });
  };

  // FIXED: Next Step Logic
  const nextStep = () => {
    // Validate current step
    if (!isStepValid(activeStep)) {
      toast({
        title: "Missing details",
        description: `Please fill all required fields in ${steps[activeStep - 1]} step.`,
        variant: "destructive",
      });
      return;
    }
    
    // Go to next step or Order Summary
    if (activeStep === 1) {
      // Contact → Address
      setActiveStep(2);
      toast({
        title: "Address details",
        description: "Please enter your complete delivery address.",
      });
    } else if (activeStep === 2) {
      // Address → Payment
      setActiveStep(3);
      toast({
        title: "Payment method",
        description: "Choose your preferred payment option.",
      });
    } else if (activeStep === 3) {
      // Payment → Order Summary
      goToOrderSummary();
    }
  };

  const prevStep = () => setActiveStep((s) => Math.max(1, s - 1));

  return (
    <Layout>
      <section className="py-8 md:py-12 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* PROGRESS STEPPER */}
          <div className="mb-8 md:mb-10">
            <div className="flex justify-center">
              <div className="inline-flex w-full max-w-sm sm:max-w-lg mx-auto items-center justify-center">
                {steps.map((step, index) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold transition-all ${
                        activeStep > index + 1
                          ? "bg-green-500 text-white"
                          : activeStep === index + 1
                          ? "bg-amber-500 text-white ring-2 ring-amber-300"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-3 ${
                          activeStep > index + 1
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-7 md:gap-9">
            {/* LEFT: STEPS */}
            <div className="lg:col-span-2 space-y-5 md:space-y-7">
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground mb-1 md:mb-3"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Cart
              </Link>

              {/* STEP 1 - Contact */}
              {activeStep === 1 && (
                <div className="bg-white/90 backdrop-blur-sm p-5 md:p-7 rounded-2xl border border-border shadow-md">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">Contact information</h2>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Order updates will be sent to your email and WhatsApp.
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base">First name *</Label>
                      <Input name="firstName" value={form.firstName} onChange={handleInputChange} required className="h-11 md:h-12 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base">Last name *</Label>
                      <Input name="lastName" value={form.lastName} onChange={handleInputChange} required className="h-11 md:h-12 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base">Email *</Label>
                      <Input name="email" type="email" value={form.email} onChange={handleInputChange} required className="h-11 md:h-12 text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base">Phone (WhatsApp) *</Label>
                      <Input name="phone" type="tel" inputMode="numeric" maxLength={10} value={form.phone} onChange={handleInputChange} required className="h-11 md:h-12 text-base" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 - COMPLETE ADDRESS - ALL FIELDS ADDED */}
              {activeStep === 2 && (
                <div className="bg-white/90 backdrop-blur-sm p-5 md:p-7 rounded-2xl border border-border shadow-md">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 bg-green-100 rounded-2xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">Delivery address</h2>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Exact address helps us deliver faster.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-muted-foreground">You can also use your current GPS location.</p>
                    <Button type="button" size="sm" onClick={handleUseCurrentLocation} className="h-9 px-4 text-sm md:text-base bg-orange-500 hover:bg-orange-600 text-white">
                      Use current location
                    </Button>
                  </div>

                  {/* COMPLETE ADDRESS FORM */}
                  <div className="space-y-5">
                    {/* 1️⃣ Flat/Apartment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Flat No. *</Label>
                        <Input 
                          name="flatNo" 
                          value={form.flatNo} 
                          onChange={handleInputChange} 
                          required 
                          className="h-11 md:h-12 text-base" 
                          placeholder="Flat 402"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Apartment Name *</Label>
                        <Input 
                          name="apartmentName" 
                          value={form.apartmentName} 
                          onChange={handleInputChange} 
                          required 
                          className="h-11 md:h-12 text-base" 
                          placeholder="Sunrise Apartments"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Floor No. *</Label>
                        <Input 
                          name="floorNumber" 
                          value={form.floorNumber} 
                          onChange={handleInputChange} 
                          required 
                          className="h-11 md:h-12 text-base" 
                          placeholder="4th Floor"
                        />
                      </div>
                    </div>

                    {/* 2️⃣ Street Area */}
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base font-medium">Street/Area *</Label>
                      <Input 
                        name="streetArea" 
                        value={form.streetArea} 
                        onChange={handleInputChange} 
                        required 
                        className="h-11 md:h-12 text-base" 
                        placeholder="Velore, Thottampalayam"
                      />
                    </div>

                    {/* 3️⃣ Full Address */}
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base font-medium">Full address *</Label>
                      <Input 
                        name="address" 
                        value={form.address} 
                        onChange={handleInputChange} 
                        required 
                        className="h-11 md:h-12 text-base" 
                        placeholder="House name, Door number, etc."
                      />
                    </div>

                    {/* 4️⃣ Landmark & PIN code */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">Landmark *</Label>
                        <Input 
                          name="landmark" 
                          value={form.landmark} 
                          onChange={handleInputChange} 
                          required 
                          className="h-11 md:h-12 text-base" 
                          placeholder="Near Shree Krishna Sweets"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">PIN code *</Label>
                        <Input 
                          name="pincode" 
                          inputMode="numeric" 
                          maxLength={6} 
                          value={form.pincode} 
                          onChange={(e) => { 
                            handleInputChange(e); 
                            validatePincode(e.target.value); 
                          }} 
                          required 
                          className="h-11 md:h-12 text-base"  
                          placeholder="632004" 
                        />
                      </div>
                    </div>

                    {/* 5️⃣ City & State */}
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">City/District *</Label>
                        <Input 
                          name="city" 
                          value={form.city} 
                          onChange={handleInputChange} 
                          required 
                          className="h-11 md:h-12 text-base" 
                          placeholder="Salem"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">State</Label>
                        <Input 
                          name="state" 
                          value={form.state} 
                          onChange={handleInputChange} 
                          className="h-11 md:h-12 text-base" 
                          placeholder="Tamil Nadu"
                        />
                      </div>
                    </div>

                    {/* Live Location Preview */}
                    {locationCoords.lat && locationCoords.lng && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-2xl text-sm text-green-800">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">Live GPS Location Detected</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl text-xs font-mono">
                          📍 {locationCoords.lat.toFixed(6)}, {locationCoords.lng.toFixed(6)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 - Payment */}
              {activeStep === 3 && (
                <div className="bg-white/90 backdrop-blur-sm p-5 md:p-7 rounded-2xl border border-border shadow-md">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-11 h-11 bg-amber-100 rounded-2xl flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">Payment method</h2>
                      <p className="text-sm md:text-base text-muted-foreground">
                        Pay securely. No extra charges. Total: ₹{total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Payment options */}
                  <div className="space-y-4 mb-6">
                    <Button
                      type="button"
                      onClick={() => setPaymentMethod("razorpay")}
                      variant={paymentMethod === "razorpay" ? "default" : "ghost"}
                      className="w-full h-13 justify-start gap-3 border-2 text-base"
                    >
                      <CreditCard className="h-6 w-6" />
                      <span>Cards / UPI / Netbanking (Razorpay)</span>
                      <span className="ml-auto text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">Recommended</span>
                    </Button>
                    
                    
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div className="flex flex-col items-center p-3 bg-blue-50 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-blue-600 mb-1" />
                      <span>Secure</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-green-50 rounded-xl">
                      <Truck className="h-5 w-5 text-green-600 mb-1" />
                      <span>Free delivery</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-purple-50 rounded-xl">
                      <Phone className="h-5 w-5 text-purple-600 mb-1" />
                      <span>WhatsApp support</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-sm sticky top-24 p-5 md:p-6 rounded-2xl border border-border shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-3">
                  Order summary
                  <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">
                    {visibleItems.length} item{visibleItems.length !== 1 ? "s" : ""}
                  </span>
                </h3>

                <div className="space-y-4 mb-5 max-h-64 overflow-y-auto">
                  {visibleItems.length === 0 && (
                    <p className="text-sm text-muted-foreground">Your cart looks empty. Add products to continue.</p>
                  )}
                  {visibleItems.map((item: any) => {
                    const imageUrl = item.image || 
                      `https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=${encodeURIComponent(item.name.substring(0,1))}`;
                    return (
                      <div key={item.id} className="flex items-stretch gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-16 h-16 md:w-18 md:h-18 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://via.placeholder.com/64x64/10b981/ffffff?text=${encodeURIComponent(item.name.substring(0,1))}`;
                            }}
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between min-h-[60px]">
                          <p className="font-medium text-sm md:text-base truncate leading-tight">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="flex flex-col items-end justify-center">
                          <span className="font-semibold text-base md:text-lg text-right">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 mb-4 border-t border-border pt-3 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-700 font-medium">
                      <span>Discount</span>
                      <span>-₹{couponDiscount.toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="font-medium text-green-700">Free</span>
                  </div>
                </div>

                <div className="mb-4 text-sm md:text-base text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Estimated delivery</span>
                    <span className="font-medium text-foreground">2–4 days</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-5">
                  <div className="flex justify-between items-center text-xl md:text-3xl font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full h-12 md:h-14 text-base md:text-lg font-bold shadow-md bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    disabled={isProcessing || visibleItems.length === 0}
                  >
                    {isProcessing
                      ? "Processing..."
                      : activeStep === 1
                      ? "Continue to Address"
                      : activeStep === 2
                      ? "Continue to Payment"
                      : activeStep === 3
                      ? `Review Order → ₹${total.toLocaleString()}`
                      : `Continue`}
                  </Button>
                  {activeStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="w-full h-10 text-sm md:text-base">
                      ← Back
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
