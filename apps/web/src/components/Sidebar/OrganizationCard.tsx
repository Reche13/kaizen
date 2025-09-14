import { ChevronRight } from "lucide-react";
import React from "react";

interface OrganizationCardProps {
  name: string;
}

export const OrganizationCard = ({ name }: OrganizationCardProps) => {
  return (
    <div className="w-full rounded-lg border border-surface-seconday p-4 flex items-center justify-between">
      <div className="flex items-center gap-[18px]">
        <div className="w-[44px] h-[44px] rounded-full bg-[#454CEE] p-2.5">
          <div className="w-full h-full bg-white"></div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold text-gray-900">{name}</span>
          <span className="text-[12px] font-normal text-gray-600">
            Organization
          </span>
        </div>
      </div>

      <button className="cursor-pointer">
        <ChevronRight className="text-gray-600" size={14} />
      </button>
    </div>
  );
};
