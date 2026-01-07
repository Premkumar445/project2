// src/pages/SignUpPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !phone || !password) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg =
          data.email?.[0] ||
          data.phone?.[0] ||
          data.password?.[0] ||
          "Registration failed";
        alert(msg);
        return;
      }

      const userData = {
        id: String(data.id),
        email: data.email,
        name: data.name,
      };

      login(userData);
      navigate("/");
    } catch (error) {
      console.error("Signup network error:", error);
      alert("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !!name && !!email && !!password && !!phone && !loading;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
        <h1 className="text-3xl font-bold text-emerald-700 text-center mb-2">
          Create Account
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Join HarvestBites and start your healthy snack journey
        </p>

        <div className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            disabled={loading}
            className="w-full h-11"
          />

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email id"
            disabled={loading}
            className="w-full h-11"
          />

          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            disabled={loading}
            className="w-full h-11"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            disabled={loading}
            className="w-full h-11"
          />

          <Button
            onClick={handleRegister}
            disabled={!canSubmit}
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold rounded-xl"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          By continuing, you agree to our Terms &amp; Privacy Policy.
        </p>

        <p className="mt-3 text-sm text-emerald-700 text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline font-medium">
            Login →
          </Link>
        </p>
      </div>
    </div>
  );
}
