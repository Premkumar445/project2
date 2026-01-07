import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Package,
  Clock,
  CreditCard,
  Heart,
  Bell,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  TruckIcon,
  AlertCircle,
  ChevronRight,
  Star,
  Settings,
  Gift,
  Wallet,
  Home,
} from "lucide-react";

interface Address {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "netbanking";
  last4?: string;
  cardType?: string;
  upiId?: string;
  bankName?: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  shippingAddress: string;
  trackingNumber?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showAddAddressDialog, setShowAddAddressDialog] = useState(false);
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);

  // Profile Form Data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3",
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "HB-2024-001234",
      date: "2024-12-15",
      status: "delivered",
      items: [
        {
          name: "Chocolate Chip Cookies (500g)",
          quantity: 2,
          price: 299,
          image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
        },
        {
          name: "Oat Biscuits (250g)",
          quantity: 1,
          price: 149,
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
        },
      ],
      total: 747,
      shippingAddress: "123/45 Hosur Main Road, Tamil Nadu 635109",
      trackingNumber: "TRK123456789",
    },
    {
      id: "2",
      orderNumber: "HB-2024-001235",
      date: "2024-12-20",
      status: "shipped",
      items: [
        {
          name: "Butter Cookies (300g)",
          quantity: 3,
          price: 199,
          image: "https://images.unsplash.com/photo-1590080876311-06b3ddeb7c4f?w=400",
        },
      ],
      total: 597,
      shippingAddress: "123/45 Hosur Main Road, Tamil Nadu 635109",
      trackingNumber: "TRK987654321",
    },
  ]);

  // Addresses State
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      addressLine1: "123/45 Hosur Main Road",
      addressLine2: "Near City Mall",
      city: "Hosur",
      state: "Tamil Nadu",
      pincode: "635109",
      isDefault: true,
    },
  ]);

  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      last4: "4242",
      cardType: "Visa",
      isDefault: true,
    },
    {
      id: "2",
      type: "upi",
      upiId: "rajesh@paytm",
      isDefault: false,
    },
  ]);

  // Wishlist State
  const [wishlist, setWishlist] = useState([
    {
      id: "1",
      name: "Premium Almond Cookies",
      price: 349,
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
      inStock: true,
    },
    {
      id: "2",
      name: "Chocolate Wafers",
      price: 199,
      image: "https://images.unsplash.com/photo-1590080876311-06b3ddeb7c4f?w=400",
      inStock: false,
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    localStorage.setItem("hb_profile", JSON.stringify(formData));
    setTimeout(() => {
      alert("Profile updated successfully!");
    }, 500);
  };

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("hb_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setFormData((prev) => ({ ...prev, ...parsed }));
      } catch {}
    }

    // Load orders
    const savedOrders = localStorage.getItem("harvestbites_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {}
    }
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // Helper Functions
  const getOrderStatusColor = (status: string) => {
    const colors = {
      delivered: "bg-green-100 text-green-800 border-green-200",
      shipped: "bg-blue-100 text-blue-800 border-blue-200",
      processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status as keyof typeof colors] || colors.processing;
  };

  const getOrderStatusIcon = (status: string) => {
    const icons = {
      delivered: <CheckCircle className="h-4 w-4" />,
      shipped: <TruckIcon className="h-4 w-4" />,
      processing: <Clock className="h-4 w-4" />,
      cancelled: <XCircle className="h-4 w-4" />,
    };
    return icons[status as keyof typeof icons] || icons.processing;
  };

  return (
    <Layout>
      <section className="py-10 bg-gradient-to-b from-sand to-background min-h-screen">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              Back to Shop
            </Button>
          </div>

          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-2">
                My Account
              </h1>
              <p className="text-muted-foreground">
                Manage your profile, orders, and preferences
              </p>
            </div>
            <Button variant="outline" className="gap-2">
              <Gift className="h-4 w-4" />
              Rewards: 250 pts
            </Button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* LEFT SIDEBAR - NAVIGATION */}
            <div className="lg:col-span-1">
              <div className="bg-card p-6 rounded-2xl border border-border sticky top-20 h-fit shadow-sm">
                {/* User Info Card */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/10">
                    <AvatarImage src={formData.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {formData.firstName?.[0] || "G"}
                      {formData.lastName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                      {formData.firstName || "Guest"}{" "}
                      {formData.lastName || ""}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {formData.email || "No email set"}
                    </p>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1">
                  {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "orders", label: "My Orders", icon: Package },
                    { id: "wishlist", label: "Wishlist", icon: Heart },
                    { id: "address", label: "Addresses", icon: MapPin },
                    { id: "payment", label: "Payment Methods", icon: CreditCard },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "security", label: "Security", icon: Shield },
                  ].map((item) => (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? "secondary" : "ghost"}
                      className="w-full justify-start h-11 text-left text-sm gap-3"
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                      {activeTab === item.id && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </Button>
                  ))}
                </nav>

                <Separator className="my-4" />

                <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="lg:col-span-3 space-y-6">
              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">Profile Information</CardTitle>
                        <CardDescription>
                          Update your personal details and preferences
                        </CardDescription>
                      </div>
                      <Button
                        size="sm"
                        variant={isEditing ? "outline" : "default"}
                        onClick={() => setIsEditing(!isEditing)}
                        className="gap-2"
                      >
                        {isEditing ? "Cancel" : "Edit Profile"}
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-xl">
                      <Avatar className="h-24 w-24 ring-4 ring-background">
                        <AvatarImage src={formData.avatar} />
                        <AvatarFallback className="text-2xl">
                          {formData.firstName?.[0]}
                          {formData.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <div className="flex-1">
                          <Label className="text-sm font-medium mb-2 block">
                            Profile Picture URL
                          </Label>
                          <Input
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleInputChange}
                            placeholder="Enter image URL"
                            className="max-w-md"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Recommended: 400x400px, JPG or PNG
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Personal Information */}
                    <div>
                      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">First Name</Label>
                          {isEditing ? (
                            <Input
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="Enter first name"
                            />
                          ) : (
                            <div className="h-10 bg-muted/50 rounded-md px-3 py-2 flex items-center text-sm">
                              {formData.firstName || "Not set"}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Last Name</Label>
                          {isEditing ? (
                            <Input
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Enter last name"
                            />
                          ) : (
                            <div className="h-10 bg-muted/50 rounded-md px-3 py-2 flex items-center text-sm">
                              {formData.lastName || "Not set"}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </Label>
                          <div className="h-10 bg-muted/50 rounded-md px-3 py-2 flex items-center text-sm">
                            {formData.email || "Not set"}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Email cannot be changed
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </Label>
                          {isEditing ? (
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 98765 43210"
                            />
                          ) : (
                            <div className="h-10 bg-muted/50 rounded-md px-3 py-2 flex items-center text-sm">
                              {formData.phone || "Not set"}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Date of Birth</Label>
                          {isEditing ? (
                            <Input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <div className="h-10 bg-muted/50 rounded-md px-3 py-2 flex items-center text-sm">
                              {formData.dateOfBirth || "Not set"}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Gender</Label>
                          {isEditing ? (
                            <Select
                              value={formData.gender}
                              onValueChange={(value) =>
                                setFormData({ ...formData, gender: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">
                                  Prefer not to say
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="h-10 bg-muted/50 rounded-md px-3 py-2 flex items-center text-sm capitalize">
                              {formData.gender || "Not set"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-3 pt-4 border-t border-border">
                        <Button onClick={handleSaveProfile} className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* ORDERS TAB */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <Card className="border-border shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Package className="h-6 w-6" />
                        My Orders
                      </CardTitle>
                      <CardDescription>
                        Track and manage your orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Order Filters */}
                      <Tabs defaultValue="all" className="mb-6">
                        <TabsList className="grid w-full grid-cols-5">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="processing">Processing</TabsTrigger>
                          <TabsTrigger value="shipped">Shipped</TabsTrigger>
                          <TabsTrigger value="delivered">Delivered</TabsTrigger>
                          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                        </TabsList>
                      </Tabs>

                      {/* Orders List */}
                      {orders.length === 0 ? (
                        <div className="text-center py-12">
                          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
                          <p className="text-muted-foreground mb-6">
                            Start shopping to see your orders here
                          </p>
                          <Button onClick={() => navigate("/products")}>
                            Browse Products
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <Card key={order.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-6">
                                {/* Order Header */}
                                <div className="flex items-start justify-between mb-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                      <h3 className="font-semibold text-lg">
                                        Order #{order.orderNumber}
                                      </h3>
                                      <Badge
                                        variant="outline"
                                        className={getOrderStatusColor(order.status)}
                                      >
                                        {getOrderStatusIcon(order.status)}
                                        <span className="ml-1 capitalize">
                                          {order.status}
                                        </span>
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                      <Clock className="h-4 w-4" />
                                      Placed on {new Date(order.date).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Total</p>
                                    <p className="text-xl font-bold">₹{order.total}</p>
                                  </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Order Items */}
                                <div className="space-y-3 mb-4">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 rounded-lg object-cover"
                                      />
                                      <div className="flex-1">
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          Qty: {item.quantity} × ₹{item.price}
                                        </p>
                                      </div>
                                      <p className="font-semibold">
                                        ₹{item.quantity * item.price}
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                {/* Order Actions */}
                                <div className="flex items-center gap-3 pt-4 border-t border-border">
                                  {order.trackingNumber && (
                                    <Button variant="outline" size="sm" className="gap-2">
                                      <TruckIcon className="h-4 w-4" />
                                      Track Order
                                    </Button>
                                  )}
                                  <Button variant="outline" size="sm" className="gap-2">
                                    <Eye className="h-4 w-4" />
                                    View Details
                                  </Button>
                                  <Button variant="outline" size="sm" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Invoice
                                  </Button>
                                  {order.status === "delivered" && (
                                    <Button variant="outline" size="sm" className="gap-2 ml-auto">
                                      <Star className="h-4 w-4" />
                                      Rate & Review
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* WISHLIST TAB */}
              {activeTab === "wishlist" && (
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Heart className="h-6 w-6" />
                      My Wishlist
                    </CardTitle>
                    <CardDescription>
                      Save your favorite products for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-semibold text-lg mb-2">
                          Your wishlist is empty
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Add items you love to your wishlist
                        </p>
                        <Button onClick={() => navigate("/products")}>
                          Start Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {wishlist.map((item) => (
                          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                              />
                              {!item.inStock && (
                                <Badge
                                  variant="secondary"
                                  className="absolute top-3 right-3 bg-red-100 text-red-800"
                                >
                                  Out of Stock
                                </Badge>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-2">{item.name}</h3>
                              <p className="text-xl font-bold text-primary mb-4">
                                ₹{item.price}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  className="flex-1"
                                  disabled={!item.inStock}
                                  size="sm"
                                >
                                  {item.inStock ? "Add to Cart" : "Notify Me"}
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === "address" && (
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <MapPin className="h-6 w-6" />
                          Saved Addresses
                        </CardTitle>
                        <CardDescription>
                          Manage your delivery addresses
                        </CardDescription>
                      </div>
                      <Dialog
                        open={showAddAddressDialog}
                        onOpenChange={setShowAddAddressDialog}
                      >
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Address
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                            <DialogDescription>
                              Enter your delivery address details
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input placeholder="John Doe" />
                              </div>
                              <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <Input placeholder="+91 98765 43210" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Address Line 1</Label>
                              <Input placeholder="House/Flat No., Building Name" />
                            </div>
                            <div className="space-y-2">
                              <Label>Address Line 2</Label>
                              <Input placeholder="Street, Area, Landmark (Optional)" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>City</Label>
                                <Input placeholder="Hosur" />
                              </div>
                              <div className="space-y-2">
                                <Label>State</Label>
                                <Input placeholder="Tamil Nadu" />
                              </div>
                              <div className="space-y-2">
                                <Label>Pincode</Label>
                                <Input placeholder="635109" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Address Type</Label>
                              <Select defaultValue="home">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="home">Home</SelectItem>
                                  <SelectItem value="work">Work</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setShowAddAddressDialog(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                setShowAddAddressDialog(false);
                                // Add save logic here
                              }}
                            >
                              Save Address
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <Card
                          key={address.id}
                          className={`relative ${
                            address.isDefault
                              ? "ring-2 ring-primary"
                              : ""
                          }`}
                        >
                          <CardContent className="p-6">
                            {address.isDefault && (
                              <Badge className="absolute top-4 right-4">Default</Badge>
                            )}
                            <div className="flex items-start gap-3 mb-4">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                {address.type === "home" && <Home className="h-5 w-5 text-primary" />}
                                {address.type === "work" && <Settings className="h-5 w-5 text-primary" />}
                                {address.type === "other" && <MapPin className="h-5 w-5 text-primary" />}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg capitalize">
                                  {address.type}
                                </h3>
                                <p className="text-sm font-medium mt-1">{address.name}</p>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                              <p>{address.addressLine1}</p>
                              {address.addressLine2 && <p>{address.addressLine2}</p>}
                              <p>
                                {address.city}, {address.state} - {address.pincode}
                              </p>
                              <p className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                {address.phone}
                              </p>
                            </div>
                            <div className="flex gap-2 pt-4 border-t border-border">
                              <Button variant="outline" size="sm" className="flex-1 gap-2">
                                <Edit3 className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1 gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* PAYMENT METHODS TAB */}
              {activeTab === "payment" && (
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                          <CreditCard className="h-6 w-6" />
                          Payment Methods
                        </CardTitle>
                        <CardDescription>
                          Manage your saved payment options
                        </CardDescription>
                      </div>
                      <Dialog
                        open={showAddPaymentDialog}
                        onOpenChange={setShowAddPaymentDialog}
                      >
                        <DialogTrigger asChild>
                          <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Payment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Payment Method</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="card" className="mt-4">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="card">Card</TabsTrigger>
                              <TabsTrigger value="upi">UPI</TabsTrigger>
                              <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                            </TabsList>
                            <TabsContent value="card" className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label>Card Number</Label>
                                <Input placeholder="1234 5678 9012 3456" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Expiry Date</Label>
                                  <Input placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                  <Label>CVV</Label>
                                  <Input type="password" placeholder="123" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Cardholder Name</Label>
                                <Input placeholder="John Doe" />
                              </div>
                            </TabsContent>
                            <TabsContent value="upi" className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label>UPI ID</Label>
                                <Input placeholder="username@paytm" />
                              </div>
                              <Button className="w-full">Verify UPI ID</Button>
                            </TabsContent>
                            <TabsContent value="netbanking" className="space-y-4 mt-4">
                              <div className="space-y-2">
                                <Label>Select Bank</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose your bank" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="sbi">State Bank of India</SelectItem>
                                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                    <SelectItem value="icici">ICICI Bank</SelectItem>
                                    <SelectItem value="axis">Axis Bank</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TabsContent>
                          </Tabs>
                          <DialogFooter className="mt-6">
                            <Button
                              variant="outline"
                              onClick={() => setShowAddPaymentDialog(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={() => setShowAddPaymentDialog(false)}>
                              Add Payment Method
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <Card
                          key={method.id}
                          className={`${
                            method.isDefault ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                  {method.type === "card" && <CreditCard className="h-6 w-6 text-primary" />}
                                  {method.type === "upi" && <Wallet className="h-6 w-6 text-primary" />}
                                  {method.type === "netbanking" && <Settings className="h-6 w-6 text-primary" />}
                                </div>
                                <div>
                                  {method.type === "card" && (
                                    <>
                                      <p className="font-semibold">
                                        {method.cardType} •••• {method.last4}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        Debit/Credit Card
                                      </p>
                                    </>
                                  )}
                                  {method.type === "upi" && (
                                    <>
                                      <p className="font-semibold">{method.upiId}</p>
                                      <p className="text-sm text-muted-foreground">UPI</p>
                                    </>
                                  )}
                                  {method.type === "netbanking" && (
                                    <>
                                      <p className="font-semibold">{method.bankName}</p>
                                      <p className="text-sm text-muted-foreground">
                                        Net Banking
                                      </p>
                                    </>
                                  )}
                                  {method.isDefault && (
                                    <Badge variant="secondary" className="mt-1">
                                      Default
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900 mb-1">
                          Your payments are secure
                        </p>
                        <p className="text-blue-700">
                          All payment information is encrypted and secured with industry-standard SSL technology.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Bell className="h-6 w-6" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Manage how you receive updates from HarvestBites
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        title: "Order Updates",
                        description: "Get notified about your order status and delivery",
                        enabled: true,
                      },
                      {
                        title: "Promotional Offers",
                        description: "Receive exclusive deals and discounts",
                        enabled: true,
                      },
                      {
                        title: "New Products",
                        description: "Be the first to know about new arrivals",
                        enabled: false,
                      },
                      {
                        title: "Price Drops",
                        description: "Get alerts when items in your wishlist go on sale",
                        enabled: true,
                      },
                      {
                        title: "Newsletter",
                        description: "Weekly updates and recipes delivered to your inbox",
                        enabled: false,
                      },
                    ].map((pref, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{pref.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {pref.description}
                          </p>
                        </div>
                        <Button
                          variant={pref.enabled ? "default" : "outline"}
                          size="sm"
                        >
                          {pref.enabled ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Shield className="h-6 w-6" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and privacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Change Password */}
                    <div className="p-6 rounded-lg border border-border">
                      <h3 className="font-semibold text-lg mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Current Password</Label>
                          <Input type="password" placeholder="Enter current password" />
                        </div>
                        <div className="space-y-2">
                          <Label>New Password</Label>
                          <Input type="password" placeholder="Enter new password" />
                        </div>
                        <div className="space-y-2">
                          <Label>Confirm New Password</Label>
                          <Input type="password" placeholder="Confirm new password" />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-6 rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                          Not Enabled
                        </Badge>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>

                    {/* Active Sessions */}
                    <div className="p-6 rounded-lg border border-border">
                      <h3 className="font-semibold text-lg mb-4">Active Sessions</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div>
                            <p className="font-medium">Chrome on Windows</p>
                            <p className="text-sm text-muted-foreground">
                              Salem, Tamil Nadu • Current session
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </div>
                        <Button variant="outline" className="w-full">
                          Sign Out All Other Sessions
                        </Button>
                      </div>
                    </div>

                    {/* Delete Account */}
                    <div className="p-6 rounded-lg border border-destructive/50 bg-destructive/5">
                      <h3 className="font-semibold text-lg text-destructive mb-2">
                        Delete Account
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" className="gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
