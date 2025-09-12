import React from "react";
import LoginForm from "./_components/LoginForm";
import { GoogleLoginButton } from "../_components/GoogleLoginButton";

const Page = () => {
  return (
    <div className="shrink-0 h-screen flex-[2] flex flex-col items-center">
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
        <div className="mt-10 w-full">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Page;
