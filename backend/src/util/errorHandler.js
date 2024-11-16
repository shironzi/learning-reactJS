// Centralized error handler for the application

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: `Error: ${err.message}` });
};

module.exports = errorHandler;
