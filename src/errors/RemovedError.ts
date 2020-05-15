import GenericError from "./GenericError";

class RemovedError extends GenericError {
  constructor(message?: string) {
    super(message, 410);
  }
}

export default RemovedError;
