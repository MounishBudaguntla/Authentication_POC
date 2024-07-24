const { expressjwt: expressJwt } = require('express-jwt');

exports.protect = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'auth' // to store decoded token
});

// Middleware to check roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({
        error: 'You do not have permission to access this resource'
      });
    }
    next();
  };
};
