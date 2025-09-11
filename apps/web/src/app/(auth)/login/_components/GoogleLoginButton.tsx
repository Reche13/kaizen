"use client";
import {
  CodeResponse,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import Image from "next/image";
import googleImage from "@/assets/logos/google.png";
import { useRouter } from "next/navigation";
import { googleAuth } from "./googleAuth";

const GoogleLogin = () => {
  const router = useRouter();

  const onGoogleLoginSuccess = async (authResult: CodeResponse) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);

        console.log(result);
        // router.push("/dashboard");
      } else {
        throw new Error("Google Login Failed");
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const onGoogleLoginError = (
    errorResponse: Pick<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    console.log(errorResponse);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    onError: onGoogleLoginError,
    flow: "auth-code",
  });

  return (
    <button
      onClick={googleLogin}
      className="w-full max-w-[360px] flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-900/90 px-4 py-[10px] rounded-md"
    >
      <Image src={googleImage} alt="google" height={20} width={20} />
      <span className="text-white text-base font-medium">
        Login with Google
      </span>
    </button>
  );
};

export const GoogleLoginButton = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <GoogleLogin />
    </GoogleOAuthProvider>
  );
};
