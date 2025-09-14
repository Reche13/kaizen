import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  email: string;
  name: string;
  image: string;
  iat: number;
  exp: number;
}

interface AuthState {
  user: JwtPayload | null;
  accessToken: string | null;
  setAuth: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (token: string) => {
        const decoded = jwtDecode<JwtPayload>(token);
        set({ accessToken: token, user: decoded });
      },
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "kaizen-auth-storage",
    }
  )
);
