export default class BadRequestException extends Error {
  status: number;
  constructor(message?: string) {
    super(message || "Bad Request");
    this.status = 400;
  }
}
