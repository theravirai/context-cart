import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../validators/authValidator.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', validate(registerValidation), register);

// @route   POST /api/auth/login
// @desc    Authenticate user & issue tokens
// @access  Public
router.post('/login', validate(loginValidation), login);

export default router;
