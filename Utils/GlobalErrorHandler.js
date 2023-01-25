module.exports = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.message || "Error";
  if (process.env.NODE_ENV === "production") {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else if (process.env.NODE_ENV === "development") {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error,
      stack: error.stack,
    });
  }
};
