const AppError = require("../utils/AppError");

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateField = (err) => {
  const message = `This Email already Exist`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError("Invalid Token Please login again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your Token has been expired Please login again", 401);

const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.assign(err);
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateField(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (error.isOperational === true)
      res.status(err.statusCode).json({
        status: err.status,
        message: error.message,
        err,
      });
    else
      res.status(500).json({
        status: "error",
        message: "Something Went wrong!!!",
        err,
      });
  }
};

module.exports = errorController;
