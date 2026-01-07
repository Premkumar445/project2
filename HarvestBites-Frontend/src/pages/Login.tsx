import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Store token and user data
      localStorage.setItem("authToken", data.token);
      login({
        id: data.id,
        email: data.email,
        name: data.name,
      });

      navigate("/");
    } catch (err: any) {
      setError(`Error: ${err?.message || "Failed to connect to backend"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-[#f5f5f5]">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-md px-6 py-6 shadow-sm">
          {/* Title + create account link */}
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-1 text-sm text-gray-600">
              or{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                create an account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label className="text-sm font-normal text-gray-800">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="mt-1 h-10 rounded-none border border-gray-300 focus-visible:ring-0 focus-visible:border-blue-600"
              />
            </div>

            {/* Password */}
            <div>
              <Label className="text-sm font-normal text-gray-800">
                Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="mt-1 h-10 rounded-none border border-gray-300 focus-visible:ring-0 focus-visible:border-blue-600"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <Checkbox id="remember" className="border-gray-400" />
              <label
                htmlFor="remember"
                className="text-sm text-gray-800 select-none"
              >
                Remember me
              </label>
            </div>

            {/* Sign in primary button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-1 h-10 rounded-none bg-[#0069ff] hover:bg-[#0055cc] text-white text-sm font-medium disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            {/* Google button */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 mt-2 rounded-none border border-gray-300 bg-white text-sm text-gray-800 flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44.5 20H24v8.5h11.9C34.7 32.9 30 36 24 36 15.6 36 9 29.4 9 21s6.6-15 15-15c4 0 7.4 1.5 9.9 3.9l6.7-6.7C36.6 2.4 30.6 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c13.3 0 24-10.7 24-24 0-1.6-.1-3.1-.5-4.5z"
                  fill="#FFC107"
                />
                <path
                  d="M6.3 14.9l6.6 4.8C14.6 16.3 19 13 24 13c4 0 7.4 1.5 9.9 3.9l6.7-6.7C36.6 2.4 30.6 0 24 0 15.8 0 8.9 4.9 6.3 14.9z"
                  fill="#FF3D00"
                />
                <path
                  d="M24 48c6.5 0 12-2.1 16.2-5.7l-7.5-6.1C29.8 36.7 27 37.5 24 37.5c-6 0-10.7-3.1-13.1-7.6l-6.6 5.1C8.9 43.1 15.8 48 24 48z"
                  fill="#4CAF50"
                />
                <path
                  d="M44.5 20H24v8.5h11.9C35.2 32.1 30 36 24 36c-6.5 0-12-2.1-16.2-5.7l-6.6 5.1C8.9 43.1 15.8 48 24 48c13.3 0 24-10.7 24-24 0-1.6-.1-3.1-.5-4.5z"
                  fill="#1976D2"
                />
              </svg>
              <span>Sign in with Google</span>
            </Button>

            {/* Forgot password */}
            <div className="mt-2 text-sm">
              <Link
                to="/forgot"
                className="text-blue-600 hover:underline text-sm"
              >
                Forgotten your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
