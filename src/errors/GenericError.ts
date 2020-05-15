class GenericError extends Error {
  constructor(message?: string, public httpCode = 500) {
    super(message);
  }
}

export default GenericError;
