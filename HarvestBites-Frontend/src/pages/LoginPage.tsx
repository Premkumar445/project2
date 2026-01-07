import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Login failed");
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
      console.error("Login error", error);
      alert("Network error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
        <h1 className="text-3xl font-bold text-emerald-700 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          Sign in to continue your HarvestBites journey
        </p>

        <div className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email id"
            disabled={loading}
            className="w-full h-11"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            className="w-full h-11"
          />

          <Button
            onClick={handleLogin}
            disabled={loading || !email || !password}
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold rounded-xl"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>

        <p className="mt-3 text-sm text-emerald-700 text-center">
          <Link to="/signup" className="underline font-medium">
            Create new account →
          </Link>
        </p>
      </div>
    </div>
  );
}
