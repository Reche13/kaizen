"use client";
import React, { useState } from "react";
import { Project } from "@/types";
import { ChevronDown, Folder } from "lucide-react";
import Link from "next/link";
interface ProjectFoldersProps {
  projects: Project[];
  orgId: string;
}

export const ProjectFolders = ({ projects, orgId }: ProjectFoldersProps) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={() => setOpen(!open)}
        className="flex px-4 py-1.5 items-center justify-between"
      >
        <span className="text-sm font-normal text-gray-600 select-none">
          Projects
        </span>
        <div
          className={`transform transition duration-200 ${open ? "rotate-0" : "rotate-180"}`}
        >
          <ChevronDown size={14} className="text-gray-600" />
        </div>
      </button>

      <div
        className={`flex flex-col w-full transform transition duration-200 origin-top ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
      >
        {projects.map((proj, index) => (
          <Link
            href={`/dashboard/${orgId}/projects/${proj.id}`}
            key={`${proj.id}-proj-${index}`}
            className="rounded-lg w-full px-4 py-3 flex items-center gap-2 hover:bg-surface-accent"
          >
            <Folder size={18} fill="#F1A856" stroke="none" />
            <span className="text-sm font-medium text-gray-900">
              {proj.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
