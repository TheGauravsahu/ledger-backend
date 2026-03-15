export class LedgerError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = true;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
