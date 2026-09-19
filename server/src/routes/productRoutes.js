import { Router } from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';
import { validateProductId } from '../validators/productValidator.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// @route   GET /api/products
// @desc    List all products (with optional filtering & pagination)
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', validate(validateProductId), getProductById);

export default router;
