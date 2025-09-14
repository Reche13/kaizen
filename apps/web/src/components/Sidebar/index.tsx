"use client";

import { OrganizationCard } from "./OrganizationCard";

export const Sidebar = ({ orgId }: { orgId: string }) => {
  return (
    <aside className="w-[230px] flex flex-col gap-4">
      <OrganizationCard name="Zudio" />
    </aside>
  );
};
