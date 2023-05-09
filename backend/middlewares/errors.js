const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    // Wrong mongoose Object ID error (such as if id of product is wrong tell user exact error)
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path} `;
      error = new ErrorHandler(message, 400);
    }

    // Handle mongoose validation error (such as if user enters new data if multiple props are missing tell exact missing props)
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handle mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handle wrong json web token error
    if (err.name === "JsonWebTokenError") {
      const message = "Json web token is invalid. Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    // Handle json web token expired error
    if (err.name === "TokenExpiredError") {
      const message = "Json web token is expired. Try again!!!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};
