import { validationResult } from 'express-validator';

/**
 * Middleware runner for express-validator rules.
 * Runs all validation chains and returns HTTP 400 with field-level
 * error messages if validation fails.
 *
 * @param {Array} validations - Array of express-validator validation chains
 */
export const validate = (validations) => {
  return async (req, res, next) => {
    // Execute all validations concurrently
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format into standardized { field, message } structure
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param || 'general',
      message: err.msg,
    }));

    return res.status(400).json({
      errors: formattedErrors,
    });
  };
};

export default validate;
