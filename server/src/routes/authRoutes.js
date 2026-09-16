import { Router } from 'express';
import { register } from '../controllers/authController.js';
import { registerValidation } from '../validators/authValidator.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', validate(registerValidation), register);

export default router;
