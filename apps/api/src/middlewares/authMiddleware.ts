import { NextFunction, Request, Response } from "express";
import { verifyTokenAndDecode } from "../libs/jwt";
import { AuthPayload } from "../types";

import InvalidCredentialsException from "../exceptions/invalidCredentials";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new InvalidCredentialsException("Missing Bearer token");
    }

    const token = authHeader.split(" ")[1];
    if (!token) throw new InvalidCredentialsException("Missing Bearer token");

    const decoded = verifyTokenAndDecode(token);

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
