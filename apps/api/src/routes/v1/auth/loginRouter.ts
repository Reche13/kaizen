import { NextFunction, Request, Response } from "express";
import z from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as z.infer<typeof loginUserSchema>;

  res.status(200);
};
