import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { User, UserRole } from "../types";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("maqraa_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (api.isEnabled()) {
        try {
          const res = await api.login({ email, password });
          if (res && res.data) {
            const data: any = res.data;
            if (data.user) {
              setUser(data.user as User);
              localStorage.setItem("maqraa_user", JSON.stringify(data.user));
            }
            if (data.access_token)
              localStorage.setItem("maqraa_token", data.access_token);
            if (data.refresh_token)
              localStorage.setItem("maqraa_refresh_token", data.refresh_token);
            return;
          }
        } catch (err) {
          // fallthrough to fallback
        }
      }

      // Fallback: Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split("@")[0],
        role: email.includes("teacher")
          ? "teacher"
          : email.includes("admin")
            ? "admin"
            : "learner",
        photoUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem("maqraa_user", JSON.stringify(mockUser));
      localStorage.setItem("maqraa_token", `token_${Date.now()}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string, role: UserRole) => {
      setIsLoading(true);
      try {
        if (api.isEnabled()) {
          try {
            const res = await api.register({ name, email, password, role });
            if (res && res.data) {
              const data: any = res.data;
              if (data.user) {
                setUser(data.user as User);
                localStorage.setItem("maqraa_user", JSON.stringify(data.user));
              }
              if (data.access_token)
                localStorage.setItem("maqraa_token", data.access_token);
              if (data.refresh_token)
                localStorage.setItem(
                  "maqraa_refresh_token",
                  data.refresh_token,
                );
              return;
            }
          } catch (err) {
            // fallthrough to fallback
          }
        }

        // Fallback: Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          name,
          role,
          photoUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
          createdAt: new Date().toISOString(),
        };

        setUser(newUser);
        localStorage.setItem("maqraa_user", JSON.stringify(newUser));
        localStorage.setItem("maqraa_token", `token_${Date.now()}`);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("maqraa_user");
    localStorage.removeItem("maqraa_token");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
