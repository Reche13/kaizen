"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { signup } from "@/services/auth";
import { signupSchema, SignupInput } from "@/schemas/auth";

const SignupForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    setServerError(null);
    try {
      const res = await signup(data.name, data.email, data.password);
      if (res.success) {
        setSuccessMessage(res.message);
        reset();
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <div className="px-4 py-[10px] border border-gray-600 rounded-md flex">
        <input
          type="text"
          {...register("name")}
          className="w-full bg-none focus:outline-none placeholder:text-gray-600 placeholder:text-sm text-sm text-gray-900"
          placeholder="Name"
        />
      </div>
      {errors.name && (
        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
      )}

      {/* EMAIL */}
      <div className="px-4 py-[10px] border border-gray-600 rounded-md flex mt-[18px]">
        <input
          type="text"
          {...register("email")}
          className="w-full bg-none focus:outline-none placeholder:text-gray-600 placeholder:text-sm text-sm text-gray-900"
          placeholder="Email"
        />
      </div>
      {errors.email && (
        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
      )}

      {/* PASSWORD */}
      <div className="px-4 py-[10px] border border-gray-600 rounded-md w-full flex items-center mt-[18px]">
        <input
          type={passwordVisible ? "text" : "password"}
          {...register("password")}
          className="w-full focus:outline-none placeholder:text-gray-600 placeholder:text-sm text-sm text-gray-900"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setPasswordVisible((prev) => !prev)}
          className="cursor-pointer"
        >
          {passwordVisible ? (
            <Eye className="size-4 text-gray-600" />
          ) : (
            <EyeOff className="size-4 text-gray-600" />
          )}
        </button>
      </div>
      {errors.password && (
        <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
      )}

      {/* SUBMIT */}
      <button
        disabled={isSubmitting}
        className="w-full rounded-md mt-8 text-white text-base font-medium bg-primary-500 hover:bg-primary-400 px-4 py-[10px] disabled:opacity-60"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>

      {/* SERVER ERROR */}
      {serverError && (
        <div className="text-xs w-full text-center flex items-center justify-center gap-2 px-3 py-1 rounded-sm bg-red-100 text-red-500 mt-4">
          <AlertCircle size={14} />
          {serverError}
        </div>
      )}

      {/* SERVER SUCCESS */}
      {successMessage && (
        <div className="text-xs w-full text-center flex items-center justify-center gap-2 px-3 py-1 rounded-sm bg-green-100 text-green-500 mt-4">
          <CheckCircle2 size={14} />
          {successMessage}
        </div>
      )}

      {/* ALREADY HAVE AN ACC */}
      <div className="w-full flex flex-col items-center text-center mt-8">
        <div className="flex items-center gap-1 w-full justify-center">
          <p className="text-sm font-normal text-gray-600">
            Already have an account?
          </p>
          <Link href="/login" className="text-sm font-normal text-primary-600">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
