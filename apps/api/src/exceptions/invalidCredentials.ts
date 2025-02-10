export default class InvalidCredentialsException extends Error {
  status: number;
  constructor(message?: string) {
    super(message || "Invalid credentials");
    this.status = 400;
  }
}
