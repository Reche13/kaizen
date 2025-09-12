"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { login } from "@/services/auth";
import { loginSchema, LoginInput } from "@/schemas/auth";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { setAuth } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    try {
      const res = await login(data.email, data.password);
      setAuth(res.accessToken);
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* EMAIL */}
      <div className="px-4 py-[10px] border border-gray-600 rounded-md flex">
        <input
          type="text"
          {...register("email")}
          className="w-full bg-none focus:outline-none placeholder:text-gray-600 placeholder:text-sm text-sm text-gray-900"
          placeholder="Email"
        />
      </div>
      {errors.email && (
        <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
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
        <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
      )}

      {/* SUBMIT */}
      <button
        disabled={isSubmitting}
        className="w-full rounded-md mt-8 text-white text-base font-medium bg-primary-500 hover:bg-primary-400 px-4 py-[10px] disabled:opacity-60"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>

      {/* SERVER ERROR */}
      {serverError && (
        <div className="text-xs w-full flex items-center gap-2 px-3 py-1 rounded-md bg-red-100 text-red-600 mt-4">
          <AlertCircle size={20} />
          {serverError}
        </div>
      )}

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
    </form>
  );
};

export default LoginForm;
