class CustomError extends Error {
  success;
  statusCode;
  status;
  isOperational;

  constructor(message, statusCode) {
    super(message);
    ((this.success = false), (this.statusCode = statusCode));
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, CustomError);
  }
}

export default CustomError;
