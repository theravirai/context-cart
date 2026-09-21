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
 * @desc    Get all unique categories
 * @route   GET /api/products/categories
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
  try {
    const rawCategories = await Product.distinct('category');
    const categories = rawCategories.filter(Boolean).map((cat) => ({
      slug: cat.toLowerCase(),
      name: cat
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      url: `/categories/${cat.toLowerCase()}`,
    }));

    return res.status(200).json(categories);
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

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Authenticated
 */
export const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      category,
      stock,
      brand,
      discountPercentage,
      rating,
      thumbnail,
      images,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      brand: brand || 'Generic',
      discountPercentage: discountPercentage || 0,
      rating: rating || 4.5,
      thumbnail: thumbnail || 'https://placehold.co/600x400?text=Product',
      images: images || [],
    });

    return res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing product
 * @route   PUT /api/products/:id
 * @access  Authenticated
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify product exists before updating per assignment requirement
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Authenticated
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify product exists before deleting per assignment requirement
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
