import { NextFunction, Request, Response } from "express";
import z from "zod";
import { hash } from "../../../libs/scrypt";
import { createUser, upsetUserAccount } from "../../../services/user";
import { generateEmailVerifyToken } from "../../../libs/jwt";

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

    await upsetUserAccount({
      userId: user.id,
      provider: "EMAIL",
      providerAccountId: user.email,
    });

    // create verify token
    const token = generateEmailVerifyToken({ email });
    if (!token) {
      throw new Error("failed to generate email verify token");
    }
    // TODO: need to change link later and make it frontend
    const verificationLink = `http://localhost:8000/api/v1/auth/verify?token=${token}`;

    // send email with token
    // TODO: EMAIL

    res.status(200).json({
      message: `verification link has been sent to your email address. ${
        verificationLink
      }`,
    });
  } catch (error: any) {
    next(error);
  }
};
