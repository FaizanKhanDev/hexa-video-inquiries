const errorHandler = (err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
};

export default errorHandler;
