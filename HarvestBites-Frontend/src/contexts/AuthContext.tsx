import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load token from localStorage on mount
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setToken(savedToken);
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    // Token should already be set in localStorage by the calling component
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
