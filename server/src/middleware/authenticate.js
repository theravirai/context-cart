import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to authenticate requests using Bearer JWT access tokens.
 * Verifies the token and attaches the authenticated user to req.user.
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Access token required',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        message: 'Access token required',
      });
    }

    // Verify JWT access token
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || 'context_cart_super_secret_access_token_key_2026'
      );
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: 'Access token expired',
          code: 'TOKEN_EXPIRED',
        });
      }
      return res.status(401).json({
        message: 'Invalid access token',
      });
    }

    // Retrieve user associated with token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: 'User no longer exists',
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
