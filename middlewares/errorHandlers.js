const errorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Token expired'
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;

