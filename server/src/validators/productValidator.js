import { body, param } from 'express-validator';

/**
 * Validation rule for MongoDB ObjectId route parameters (:id)
 */
export const validateProductId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID format'),
];

/**
 * Validation rules for creating a product (POST /api/products)
 */
export const createProductValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Product title is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required'),

  body('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Product category is required'),

  body('stock')
    .notEmpty()
    .withMessage('Product stock is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be an integer greater than or equal to 0'),

  body('brand')
    .optional()
    .trim(),

  body('discountPercentage')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),

  body('thumbnail')
    .optional()
    .trim(),

  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array of image URLs'),
];

/**
 * Validation rules for updating a product (PUT /api/products/:id)
 */
export const updateProductValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Product title cannot be empty'),

  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Product description cannot be empty'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0'),

  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Product category cannot be empty'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be an integer greater than or equal to 0'),

  body('brand')
    .optional()
    .trim(),

  body('discountPercentage')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),

  body('thumbnail')
    .optional()
    .trim(),

  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array of image URLs'),
];
