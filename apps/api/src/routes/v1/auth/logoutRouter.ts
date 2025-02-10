import { NextFunction, Request, Response } from "express";

export const logoutRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(200);
};
