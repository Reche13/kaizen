export default class ForbiddenException extends Error {
  status: number;
  constructor(message?: string) {
    super(message || "Forbidden");
    this.status = 403;
  }
}
