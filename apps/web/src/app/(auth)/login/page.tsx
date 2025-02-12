import { getGoogleOAuth2Url } from "@/libs/google";
import React from "react";
import LoginForm from "./_components/LoginForm";
import Link from "next/link";
import Image from "next/image";
import googleImage from "@/assets/logos/google.png";

const Page = () => {
  return (
    <div className="shrink-0 border h-screen flex-[2] flex flex-col items-center">
      <div className="w-[360px]">
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back, <br /> Lets Get Started
          </h1>
          <p className="text-base text-gray-600 font-normal mt-2">
            Choose your preferred log in method
          </p>
        </div>

        {/* LOGIN FORM */}
        <div className="mt-10">
          <LoginForm />
        </div>

        {/* DIVIDER */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="h-[1px] w-[120px] bg-gray-500" />
          <span className="text-gray-500 font-normal text-sm">OR</span>
          <div className="h-[1px] w-[120px] bg-gray-500" />
        </div>

        {/* GOOGLE LOGIN */}
        <Link
          href={getGoogleOAuth2Url()}
          className="mt-10 w-full max-w-[360px] flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-900/90 px-4 py-[10px] rounded-md"
        >
          <Image src={googleImage} alt="google" height={20} width={20} />
          <span className="text-white text-base font-medium">
            Login with Google
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
