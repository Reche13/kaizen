"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrganizations, createOrganization } from "@/services/organization";

const Organizations = () => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const {
    data: getOrgsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (name: string) => createOrganization(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      setName("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutate(name);
  };

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Organization name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary-500 text-white px-4 py-2 rounded"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load organizations</p>}
      {getOrgsData?.organizations && (
        <ul className="space-y-2">
          {getOrgsData.organizations.map(
            (org: { id: string; name: string }) => (
              <li key={org.id} className="border rounded p-2 bg-gray-50">
                {org.name}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Organizations;
