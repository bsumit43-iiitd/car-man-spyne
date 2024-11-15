const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Authentication middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
