"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/services/auth";

const VerifyEmail = () => {
  const [failure, setFailure] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        const res = await verifyEmail(token);

        if (res.success) {
          setFailure(false);
          setErrorMessage(null);
          router.push("/dashboard");
        } else {
          setFailure(true);
          setErrorMessage(res.message || "Email verification failed");
        }
      } catch (error: any) {
        setFailure(true);
        setErrorMessage(error?.response?.data?.message || "Unknown error");
      }
    };

    verify();
  }, [token, router]);

  let content = null;

  if (!token) {
    content = <div className="w-full flex text-red-600">No token provided</div>;
  } else if (failure === null) {
    content = <div className="w-full flex">Verifying email...</div>;
  } else if (failure) {
    content = (
      <div className="w-full flex text-red-600">
        {errorMessage || "Email verification failed. Please try again."}
      </div>
    );
  } else {
    content = (
      <div className="w-full flex text-green-600">
        Email verified successfully! Redirecting...
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <Container>{content}</Container>
    </div>
  );
};

export default VerifyEmail;
