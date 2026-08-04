"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth,
  type StoredAuth,
} from "@/lib/auth/token";

interface AuthContextValue {
  auth: StoredAuth | null;
  isReady: boolean;
  login: (auth: StoredAuth) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage: must run after mount (not in a
    // lazy useState initializer) so the server render and first client
    // render match, avoiding a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuth(getStoredAuth());
    setIsReady(true);
  }, []);

  const login = useCallback((next: StoredAuth) => {
    setStoredAuth(next);
    setAuth(next);
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setAuth(null);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
