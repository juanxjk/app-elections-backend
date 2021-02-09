import GenericError from "./GenericError";

class BadRequestError extends GenericError {
  constructor(message?: string) {
    super(message, 400);
  }
}

export default BadRequestError;
