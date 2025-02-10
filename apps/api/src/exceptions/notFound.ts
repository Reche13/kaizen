export default class NotFoundException extends Error {
  status: number;
  constructor(message?: string) {
    super(message || "Not found");
    this.status = 404;
  }
}
