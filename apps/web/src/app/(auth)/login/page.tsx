import { getGoogleOAuth2Url } from "@/libs/google";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <a
        href={getGoogleOAuth2Url()}
        className="border bg-black text-white px-4 py-2"
      >
        Google login
      </a>
    </div>
  );
};

export default Page;
