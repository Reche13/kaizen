import { NextFunction, Request, Response } from "express";
import z from "zod";
import { getUserbyEmail } from "../../../services/user";
import NotFoundException from "../../../exceptions/notFound";
import { compare } from "../../../libs/scrypt";
import InvalidCredentialsException from "../../../exceptions/invalidCredentials";
import { JwtProvider } from "../../../providers/JwtProvider";
import { setHttpCookie } from "../../../libs/cookies";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as z.infer<typeof loginUserSchema>;
  try {
    const user = await getUserbyEmail(email);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    const passwordCorrect = await compare(password, user?.hashedPassword ?? "");

    if (!passwordCorrect) {
      throw new InvalidCredentialsException();
    }

    const jwtProvider = new JwtProvider({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });

    const { token, refreshToken } = jwtProvider.generateTokens();

    setHttpCookie(res, "access_token", token);
    setHttpCookie(res, "refresh_token", refreshToken);

    res.status(200).json({ success: true, message: "logged in" });
  } catch (error: any) {
    next(error);
  }
};
