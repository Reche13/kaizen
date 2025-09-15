"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OrganizationCard } from "./OrganizationCard";
import { getSingleOrganization } from "@/services/organization";
import { ProjectFolders } from "./ProjectFolders";

export const Sidebar = ({ orgId }: { orgId: string }) => {
  const queryClient = useQueryClient();

  const {
    data: data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`organization-projs-${orgId}`],
    queryFn: () => getSingleOrganization(orgId),
  });

  return (
    <aside className="w-[230px] flex flex-col gap-4">
      <OrganizationCard name="Zudio" />

      {isLoading && <div>loading...</div>}
      {data?.organization.projects && (
        <ProjectFolders orgId={orgId} projects={data.organization.projects} />
      )}
    </aside>
  );
};
