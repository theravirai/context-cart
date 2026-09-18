import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenCookieOptions,
} from '../utils/token.js';

/**
 * @desc    Register a new user account
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Reject duplicate emails with clear 409 Conflict error
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists with this email address',
      });
    }

    // Create user (password automatically hashed by pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
    });

    // Return created user (toJSON automatically omits password and refreshToken)
    // No tokens are returned on register per specification
    return res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & issue access + refresh tokens
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verify user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Verify password with bcrypt.compare
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // Generate Access & Refresh tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Persist refresh token in MongoDB for server-side revocation on logout
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token as an httpOnly, Secure cookie
    res.cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions());

    // Return access token in JSON body
    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Refresh access token using valid refresh token cookie
 * @route   POST /api/auth/refresh-token
 * @access  Public (Requires valid refresh token)
 */
export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: 'Refresh token required',
      });
    }

    // Verify refresh token signature & expiration
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET || 'context_cart_super_secret_refresh_token_key_2026'
      );
    } catch (err) {
      return res.status(403).json({
        message: 'Invalid or expired refresh token. Please log in again.',
      });
    }

    // Retrieve user and verify token against DB record to prevent reuse/revoked tokens
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
        message: 'Refresh token is invalid or has been revoked. Please log in again.',
      });
    }

    // Issue brand-new access token and rotate refresh token
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, getRefreshTokenCookieOptions());

    return res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Log out user & invalidate refresh token
 * @route   POST /api/auth/logout
 * @access  Authenticated
 */
export const logout = async (req, res, next) => {
  try {
    // Invalidate refresh token in database
    if (req.user) {
      req.user.refreshToken = null;
      await req.user.save();
    }

    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      ...getRefreshTokenCookieOptions(),
      maxAge: 0,
    });

    return res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Authenticated
 */
export const getMe = async (req, res) => {
  // req.user was securely attached by authenticate middleware
  return res.status(200).json({
    user: req.user,
  });
};
