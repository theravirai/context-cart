/**
 * Middleware for catching requests to undefined routes (404)
 */
export const notFound = (req, res) => {
  res.status(404).json({
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Centralized error handler returning standardized JSON errors
 */
export const errorHandler = (err, req, res, next) => {
  // If status is still 200, default to 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};
