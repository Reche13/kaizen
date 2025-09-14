"use client";

import { useAuthStore } from "@/stores/auth";
import Container from "../Container";

export const Header = () => {
  const { user } = useAuthStore();
  return (
    <div className="w-full py-3 border">
      <Container size={1920}>
        <div className="w-full flex items-center justify-between">
          <span className="font-bold text-2xl text-gray-900">KAIZEN</span>
          <div className="">{user?.name}</div>
        </div>
      </Container>
    </div>
  );
};
