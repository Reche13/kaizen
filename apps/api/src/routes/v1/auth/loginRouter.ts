import { NextFunction, Request, Response } from "express";

export const loginRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  res.status(200);
};
