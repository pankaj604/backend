class ErrorHandler extends Error {
  constructor(massage, statusCode) {
    super(massage);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.massage = err.massage || "Internal Server Error";
  err.statusCode = err.statusCode || 500; 

  return res.status(err.statusCode).json({
    success: false,
    massage: err.massage,
  });
};

export default ErrorHandler;
