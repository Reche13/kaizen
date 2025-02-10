import { NextFunction, Request, Response } from "express";

export const signupRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200);
};
