import { LedgerError } from "./ledgerError.js";

export class BadRequestError extends LedgerError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends LedgerError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends LedgerError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundError extends LedgerError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends LedgerError {
  constructor(message = "Validation failed") {
    super(message, 422);
  }
}

export class InternalServerError extends LedgerError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}