import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { upsetUser, upsetUserAccount } from "../../../services/user";
import { JwtProvider } from "../../../providers/JwtProvider";
import { setHttpCookie } from "../../../libs/cookies";
import { oauth2Client } from "../../../libs/googleOauth";
import InvalidCredentialsException from "../../../exceptions/invalidCredentials";

type GoogleOAuthDecodedData = {
  email: string;
  verified_email: boolean;
  name: string;
  picture: string;
  id: string;
};

export const googleRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.query.code as string | undefined;
    if (!code) {
      res.status(400).json({ message: "Missing authorization code" });
      return;
    }
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);
    const { data }: { data: GoogleOAuthDecodedData } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    if (!data) {
      throw new InvalidCredentialsException("Failed to login using Google");
    }

    // create or update user
    const user = await upsetUser({
      email: data.email,
      emailVerified: data.verified_email,
      name: data.name,
      image: data.picture,
    });

    if (!user) {
      throw new Error("Failed to create user");
    }

    await upsetUserAccount({
      provider: "GOOGLE",
      userId: user.id,
      providerAccountId: data.id,
    });

    // Generate tokens
    const jwtProvider = new JwtProvider({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });

    const { token, refreshToken } = jwtProvider.generateTokens();

    setHttpCookie(res, "refresh_token", refreshToken);

    res
      .status(200)
      .json({ success: true, message: "logged in", access: token });
  } catch (error: any) {
    next(error);
  }
};
