"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { auth, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !auth) router.replace("/login");
  }, [isReady, auth, router]);

  if (!isReady || !auth) return null;

  return <>{children}</>;
}
