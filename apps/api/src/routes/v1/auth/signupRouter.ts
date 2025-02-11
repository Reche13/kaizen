import { NextFunction, Request, Response } from "express";
import z from "zod";
import { hash } from "../../../libs/scrypt";
import { createUser } from "../../../services/user";

export const signupUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "password should have atleast 8 characters"),
});

export const signupRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body as z.infer<
    typeof signupUserSchema
  >;
  try {
    const saltHashPassword = await hash(password);
    const user = await createUser(name, email, saltHashPassword);
    const { hashedPassword, ...userWithoutPassword } = user;
    res.send(userWithoutPassword);
  } catch (error: any) {
    next(error);
  }
};
