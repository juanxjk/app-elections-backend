import GenericError from "./GenericError";

class ValidationError extends GenericError {
  constructor(message?: string) {
    super(message, 400);
  }
}

export default ValidationError;
