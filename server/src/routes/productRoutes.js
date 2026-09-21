import { Router } from 'express';
import {
  getProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  validateProductId,
  createProductValidation,
  updateProductValidation,
} from '../validators/productValidator.js';
import { validate } from '../middleware/validate.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// @route   GET /api/products
// @desc    List all products (with optional filtering & pagination)
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/categories
// @desc    Get all unique categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', validate(validateProductId), getProductById);

// @route   POST /api/products
// @desc    Create a new product
// @access  Authenticated
router.post('/', authenticate, validate(createProductValidation), createProduct);

// @route   PUT /api/products/:id
// @desc    Update an existing product
// @access  Authenticated
router.put(
  '/:id',
  authenticate,
  validate(validateProductId),
  validate(updateProductValidation),
  updateProduct
);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Authenticated
router.delete('/:id', authenticate, validate(validateProductId), deleteProduct);

export default router;
