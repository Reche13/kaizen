import { publicApi } from "@/libs/api";

interface LoginResponse {
  success: boolean;
  accessToken: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
}

interface VerifyResponse {
  success: boolean;
  message: string;
}

export async function login(email: string, password: string) {
  const { data } = await publicApi.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return data;
}

export async function signup(name: string, email: string, password: string) {
  const { data } = await publicApi.post<SignupResponse>("/auth/signup", {
    name,
    email,
    password,
  });
  return data;
}

export async function verifyEmail(token: string) {
  const { data } = await publicApi.get<VerifyResponse>("/auth/verify", {
    params: {
      token,
    },
  });
  return data;
}
