"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="w-full">
      {/* EMAIL */}
      <div className="px-4 py-[10px] border border-gray-600 rounded-md flex">
        <input
          type="text"
          className="w-full focus:outline-none  placeholder:text-gray-600 placeholder:text-sm text-sm text-gray-900"
          placeholder="Email"
        />
      </div>
      {/* PASSWORD */}
      <div className="px-4 py-[10px] border border-gray-600 rounded-md w-full flex items-center mt-[18px]">
        <input
          type={passwordVisible ? "text" : "password"}
          className="w-full focus:outline-none  placeholder:text-gray-600 placeholder:text-sm text-sm text-gray-900"
          placeholder="Password"
        />
        <button
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="cursor-pointer"
        >
          {passwordVisible ? (
            <EyeOff className="size-4 text-gray-600" />
          ) : (
            <Eye className="size-4 text-gray-600" />
          )}
        </button>
      </div>
      {/* SUBMIT */}
      <button className="w-full rounded-md mt-8 text-white text-base font-medium bg-primary-500 hover:bg-primary-400 px-4 py-[10px]">
        Log in
      </button>

      {/* DONT HAVE AN ACC */}
      <div className="w-full flex flex-col items-center text-center mt-8">
        <div className="flex items-center gap-1 w-full justify-center">
          <p className="text-sm font-normal text-gray-600">
            Don&apos;t have an account?
          </p>
          <Link
            href="/sign-up"
            className="text-sm font-normal text-primary-600"
          >
            Register
          </Link>
        </div>
        <Link
          href="/forgot-password"
          className="text-xs font-normal text-primary-600"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
