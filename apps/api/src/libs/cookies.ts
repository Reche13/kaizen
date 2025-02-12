import { Response } from "express";

const setCookieOptions = (httpOnly: boolean) => ({
  httpOnly,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
});

export const setCookie = (res: Response, name: string, value: string) => {
  res.cookie(name, value, setCookieOptions(false));
};

export const setHttpCookie = (res: Response, name: string, value: string) => {
  res.cookie(name, value, setCookieOptions(true));
};

export const clearCookie = (res: Response, name: string) => {
  res.clearCookie(name, setCookieOptions(false));
};

export const clearHttpCookie = (res: Response, name: string) => {
  res.clearCookie(name, setCookieOptions(true));
};
