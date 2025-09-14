import { Request, Response, NextFunction } from "express";
import { generateToken, verifyRefreshTokenAndDecode } from "../../../libs/jwt";
import InvalidCredentialsException from "../../../exceptions/invalidCredentials";
import { getUserbyEmail } from "../../../services/user";

export const refreshTokenRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new InvalidCredentialsException("Refresh token missing");
    }

    const payload = verifyRefreshTokenAndDecode(refreshToken);
    if (!payload) {
      throw new InvalidCredentialsException("Invalid refresh token");
    }

    const user = await getUserbyEmail(payload.email);

    if (!user) {
      throw new InvalidCredentialsException("User not found");
    }

    const newAccessToken = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err: any) {
    next(err);
  }
};
