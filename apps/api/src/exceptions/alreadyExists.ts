export default class AlreadyExisitsException extends Error {
  status: number;
  constructor(message?: string) {
    super(message || "Already Exisits");
    this.status = 409;
  }
}
