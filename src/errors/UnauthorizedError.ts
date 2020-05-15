import GenericError from "./GenericError";

class UnauthorizedError extends GenericError {
  constructor(message?: string) {
    super(message, 401);
  }
}

export default UnauthorizedError;
