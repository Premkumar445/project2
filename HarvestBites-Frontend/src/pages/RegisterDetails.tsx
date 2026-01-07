import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterDetails() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    otp: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Register pageல save பண்ணிய email load பண்ணி fieldல show பண்ணுறது
  useEffect(() => {
    const existing = localStorage.getItem("hb_profile");
    const prev = existing ? JSON.parse(existing) : {};
    if (prev.email) {
      setForm((f) => ({ ...f, email: prev.email }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const existing = localStorage.getItem("hb_profile");
    const prev = existing ? JSON.parse(existing) : {};
    const email = form.email || prev.email;

    if (!email) {
      setError("Email missing. Please go back to Register page.");
      setLoading(false);
      return;
    }

    try {
      // 1) OTP verify backend
      const otpRes = await fetch("http://127.0.0.1:8000/api/verify-email-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: form.otp,
        }),
      });

      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        setError(otpData.error || "Invalid OTP");
        setLoading(false);
        return;
      }

      // 2) Create user account in database via register endpoint
      const registerRes = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || registerData.detail || "Registration failed");
        setLoading(false);
        return;
      }

      // 3) Store token and login user
      localStorage.setItem("authToken", registerData.token);
      login({
        id: registerData.id,
        email: registerData.email,
        name: registerData.name,
      });

      // 4) Clear profile data from localStorage
      localStorage.removeItem("hb_profile");

      // 5) success → shop page
      navigate("/shop-now");
    } catch (err: any) {
      setError(`Error: ${err?.message || "Failed to connect to backend"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Layout>
      <section className="py-16 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 border rounded-2xl bg-card p-8 md:p-10 shadow-sm">
            {/* LEFT – DETAILED REGISTER */}
            <div className="space-y-6 md:pr-8 border-r">
              <h2 className="text-2xl font-semibold text-foreground">Register</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* OTP */}
                <div className="space-y-1.5">
                  <Label htmlFor="otp">
                    OTP<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="otp"
                    name="otp"
                    placeholder="Enter OTP here"
                    value={form.otp}
                    onChange={handleChange}
                    required
                    className="h-10 text-sm"
                  />
                </div>

                {/* First / Last Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName">
                      First Name<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter First Name"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="h-10 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">
                      Last Name<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter Last Name"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-1.5">
                  <Label htmlFor="phone">
                    Mobile<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter Your Mobile"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="h-10 text-sm"
                  />
                </div>

                {/* Email (passwordக்கு மேல) */}
                <div className="space-y-1.5">
                  <Label htmlFor="email">
                    Email<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="h-10 text-sm"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password">
                    Password<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="h-10 text-sm"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                    <p className="text-xs text-destructive">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 mt-2 bg-green-600 hover:bg-green-700 text-sm font-semibold disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Submit"}
                </Button>
              </form>
            </div>

            {/* RIGHT – LOGIN */}
            <div className="space-y-6 md:pl-8 flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-semibold text-foreground">LOGIN</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For quick access to your account, log in using your registered
                Mobile Number and Password. This will give you access to your
                dashboard, order history, saved payment methods, and more for a
                seamless shopping experience.
              </p>
              <Button
                type="button"
                className="mt-2 px-10 h-11 bg-green-600 hover:bg-green-700 text-sm font-semibold"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
