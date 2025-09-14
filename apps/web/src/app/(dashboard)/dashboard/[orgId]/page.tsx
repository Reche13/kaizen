import Container from "@/components/Container";
import { Sidebar } from "@/components/Sidebar";
import React from "react";

interface PageProps {
  params: Promise<{ orgId: string }>;
}

export default async function Organization({ params }: PageProps) {
  const { orgId } = await params;
  return (
    <div className="w-full">
      <Container size={1920}>
        <div className="w-full flex gap-10 mt-5">
          <Sidebar orgId={orgId} />
          <div className="flex-1">main</div>
        </div>
      </Container>
    </div>
  );
}
