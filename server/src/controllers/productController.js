import Product from '../models/Product.js';

/**
 * @desc    Get all products (with optional search, category filter, pagination, sorting)
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const {
      category,
      q,
      search,
      limit = 50,
      skip = 0,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const query = {};

    if (category) {
      query.category = category.toLowerCase();
    }

    const searchQuery = q || search;
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } },
      ];
    }

    const parsedLimit = Math.max(1, parseInt(limit, 10) || 50);
    const parsedSkip = Math.max(0, parseInt(skip, 10) || 0);
    const sortOrder = order === 'asc' ? 1 : -1;

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(parsedSkip)
        .limit(parsedLimit),
      Product.countDocuments(query),
    ]);

    return res.status(200).json({
      products,
      total,
      skip: parsedSkip,
      limit: parsedLimit,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
