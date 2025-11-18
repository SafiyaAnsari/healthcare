const jwt = require('jsonwebtoken');
const User = require('../models/User');

// verify JWT token and attach the user record
async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const bearerPrefix = 'Bearer ';

    if (!header.startsWith(bearerPrefix)) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = header.slice(bearerPrefix.length);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
}

// allow only specific roles to access a route
function authorizeRoles() {
  const allowedRoles = Array.from(arguments);

  return function (req, res, next) {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    return next();
  };
}

module.exports = { protect, authorizeRoles };

