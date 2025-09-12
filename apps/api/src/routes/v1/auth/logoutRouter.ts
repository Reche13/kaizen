import { NextFunction, Request, Response } from "express";
import { clearHttpCookie } from "../../../libs/cookies";

export const logoutRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    clearHttpCookie(res, "refresh_token");
    res.status(200).json({ success: true, message: "logged out" });
  } catch (error: any) {
    next(error);
  }
};
