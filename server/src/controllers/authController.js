import User from '../models/User.js';

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
