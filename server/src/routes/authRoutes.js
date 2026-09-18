import { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  getMe,
} from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../validators/authValidator.js';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', validate(registerValidation), register);

// @route   POST /api/auth/login
// @desc    Authenticate user & issue tokens
// @access  Public
router.post('/login', validate(loginValidation), login);

// @route   POST /api/auth/refresh-token
// @desc    Issue a new access token using refresh token
// @access  Public (Requires valid refresh token)
router.post('/refresh-token', refreshToken);

// @route   POST /api/auth/logout
// @desc    Invalidate refresh token and clear cookie
// @access  Authenticated
router.post('/logout', authenticate, logout);

// @route   GET /api/auth/me
// @desc    Get logged-in user profile
// @access  Authenticated
router.get('/me', authenticate, getMe);

export default router;
