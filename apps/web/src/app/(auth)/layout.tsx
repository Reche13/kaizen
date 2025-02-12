import Container from "@/components/Container";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-white">
      <Container>
        <div className="w-full flex">
          {children}
          <div className="w-full text-black flex-[3]">awesome design</div>
        </div>
      </Container>
    </div>
  );
}
