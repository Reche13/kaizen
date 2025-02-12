import { generateRefreshToken, generateToken } from "../libs/jwt";

interface JwtData {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export class JwtProvider {
  private data: JwtData;

  constructor(data: JwtData) {
    this.data = data;
  }

  generateTokens() {
    const token = generateToken({
      id: this.data.id,
      name: this.data.name,
      email: this.data.email,
      image: this.data.image,
    });

    const refreshToken = generateRefreshToken({
      email: this.data.email,
    });

    return { token, refreshToken };
  }
}
