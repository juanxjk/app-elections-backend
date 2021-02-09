import BadRequestError from "./BadRequestError";

class ValidationError extends BadRequestError {
  constructor(message?: string) {
    super(message);
  }
}

export default ValidationError;
