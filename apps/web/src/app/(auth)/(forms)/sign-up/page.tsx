import React from "react";
import SignupForm from "./_components/SignupForm";
import { GoogleLoginButton } from "../(forms)/_components/GoogleLoginButton";

const Page = () => {
  return (
    <div className="shrink-0 h-screen flex-[2] flex flex-col items-center">
      <div className="w-[360px]">
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-gray-900">
            New Here? <br />
            Let’s Set Things Up
          </h1>
          <p className="text-base text-gray-600 font-normal mt-2">
            Choose your preferred sign up method
          </p>
        </div>

        {/* SIGNUP FORM */}
        <div className="mt-10">
          <SignupForm />
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
