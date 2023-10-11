class ErrorHandler extends Error {
  constructor(massage, statusCode) {
    super();
    this.massage = massage;
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  console.log({err})
  err.massage = err.massage  || "internal server error";
  err.statusCode = err.statusCode || 500; 

  return res.status(err.statusCode).json({
    success: false,
    massage: err.massage,
  });
};

export default ErrorHandler;
