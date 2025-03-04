import { NextFunction, Request, Response } from "express";
import { verifyEmailVerifyToken } from "../../../libs/jwt";
import { JwtPayload } from "jsonwebtoken";
import { getUserbyEmail, updateUserEmailVerify } from "../../../services/user";
import NotFoundException from "../../../exceptions/notFound";
import InvalidCredentialsException from "../../../exceptions/invalidCredentials";

export const verifyRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query as { token: string };
    if (!token) throw new InvalidCredentialsException("No token present");
    const { email } = (await verifyEmailVerifyToken(token)) as JwtPayload;

    const user = await getUserbyEmail(email);
    if (!user) throw new NotFoundException("user not found");

    if (user.emailVerified) {
      res.status(200).json({ message: "email is already verified" });
    } else {
      await updateUserEmailVerify(email, true);
      res.status(200).json({ message: "email is successfully verified" });
    }
  } catch (error: any) {
    next(error);
  }
};
