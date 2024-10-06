// middleware/error.js
const errorHandler = (statusCode, message) => {
  const error = new Error(message); // Set the error message
  error.statusCode = statusCode; // Set the status code
  return error;
};

const handleError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
};

module.exports = {
  errorHandler,
  handleError,
};
