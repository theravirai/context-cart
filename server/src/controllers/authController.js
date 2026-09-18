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
