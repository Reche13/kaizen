import { sign, verify, decode } from "jsonwebtoken";
import InvalidCredentialsException from "../exceptions/invalidCredentials";

export const decodeToken = (token: string) => {
  return decode(token);
};

export const generateToken = (payload: object) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.JWT_SECRET_EXPIRY as string),
  });
};

export const generateRefreshToken = (payload: object) => {
  return sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: Number(process.env.JWT_REFRESH_EXPIRY as string),
  });
};

export const verifyToken = (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      verify(token, process.env.JWT_SECRET as string);
      resolve(true);
    } catch (error) {
      resolve(false);
    }
  });
};

export const verifyRefreshToken = (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      verify(token, process.env.JWT_REFRESH_SECRET as string);
      resolve(true);
    } catch (error) {
      console.log("verify refresh token eror", error);
      resolve(false);
    }
  });
};

export const generateEmailVerifyToken = (payload: object) => {
  return sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: Number(process.env.VERIFY_EMAIL_EXPIRY as string),
  });
};

export const verifyEmailVerifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    try {
      const tokenData = verify(token, process.env.JWT_SECRET as string);
      resolve(tokenData);
    } catch (error) {
      reject(new InvalidCredentialsException("invalid token"));
    }
  });
};
