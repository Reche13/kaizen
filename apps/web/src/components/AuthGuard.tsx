"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [user, router]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
