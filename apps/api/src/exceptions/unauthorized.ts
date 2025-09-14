export default class UnauthorizedException extends Error {
  status: number;
  constructor(message?: string) {
    super(message || "Unauthorized");
    this.status = 401;
  }
}
