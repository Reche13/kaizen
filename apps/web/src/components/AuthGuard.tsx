"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setIsReady(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsReady(true);
    }

    return () => unsub();
  }, []);

  useEffect(() => {
    if (isReady) {
      if (!user?.id) {
        router.replace("/login");
      }
    }
  }, [isReady, user, router]);

  // TODO: spinner
  if (!isReady) return null;

  return <>{children}</>;
}
