import axios from "axios";
import qs from "querystring";
import { NextFunction, Request, Response } from "express";
import { decode } from "jsonwebtoken";
import { upsetUser, upsetUserAccount } from "../../../services/user";
import { JwtProvider } from "../../../providers/JwtProvider";
import { setHttpCookie } from "../../../libs/cookies";

type GoogleOAuth2TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: "Bearer";
  id_token: string;
};

type GoogleOAuthDecodedData = {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  sub: string;
};

export const googleRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = req.query.code;
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code: code as string,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_OAUTH2_REDIRECT_URL as string,
    grant_type: "authorization_code",
  };

  try {
    const tokenResponse = await axios.post<GoogleOAuth2TokenResponse>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const googleUserData = decode(
      tokenResponse.data.id_token
    ) as GoogleOAuthDecodedData | null;
    if (!googleUserData) {
      throw new Error("User data from google cannot be decoded");
    }

    // create or update user
    const user = await upsetUser({
      email: googleUserData.email,
      emailVerified: googleUserData.email_verified,
      name: googleUserData.name,
      image: googleUserData.picture,
    });

    if (!user) {
      throw new Error("Failed to create user");
    }

    await upsetUserAccount({
      provider: "GOOGLE",
      userId: user.id,
      providerAccountId: googleUserData.sub,
    });

    // Generate tokens
    const jwtProvider = new JwtProvider({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });

    const { token, refreshToken } = jwtProvider.generateTokens();

    setHttpCookie(res, "access_token", token);
    setHttpCookie(res, "refresh_token", refreshToken);

    res.redirect("http://localhost:3000/dashboard");
  } catch (error: any) {
    console.log("failed", error);
    res.redirect("http://localhost:3000/login/error");
  }
};
