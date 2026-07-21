import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { ArrowLeft, ShoppingCart, Star, Package, ShieldCheck } from 'lucide-react';
import QuantitySelector from '../../components/product/QuantitySelector';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(id);
        setProduct(data);
        setActiveImage(data.images[0] || data.thumbnail);
        setQuantity(1); // Reset quantity when product changes
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError('Failed to load product details. It may not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl animate-pulse flex flex-col lg:flex-row gap-12 mt-8">
        <div className="w-full lg:w-1/2 h-[500px] bg-gray-800 rounded-lg"></div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="h-10 bg-gray-800 rounded w-3/4"></div>
          <div className="h-6 bg-gray-800 rounded w-1/4"></div>
          <div className="h-32 bg-gray-800 rounded w-full"></div>
          <div className="h-12 bg-gray-800 rounded w-1/2"></div>
          <div className="h-12 bg-gray-800 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Oops!</h2>
        <p className="text-gray-300 mb-8">{error || 'Product not found.'}</p>
        <Link to="/products" className="text-blue-400 hover:text-blue-300 underline flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // In Phase 11 (Cart), this will hook into the cart context/storage
    console.log(`Added ${quantity} of ${product.title} to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
      </Link>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Image Gallery */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-white rounded-xl overflow-hidden h-[400px] sm:h-[500px] border border-gray-700 flex items-center justify-center p-4 relative">
            <img 
              src={activeImage} 
              alt={product.title} 
              className="max-w-full max-h-full object-contain transition-opacity duration-300"
            />
          </div>
          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-24 h-24 bg-white rounded-md border-2 overflow-hidden ${activeImage === img ? 'border-blue-500' : 'border-gray-700 hover:border-gray-500'} transition-colors p-1`}
                >
                  <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Link to={`/categories/${product.category}`} className="text-blue-400 hover:underline text-sm font-medium uppercase tracking-wider">
              {product.category}
            </Link>
            {product.discountPercentage > 10 && (
              <Badge variant="destructive">On Sale</Badge>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400">
              <Star className="h-5 w-5 fill-current" />
              <span className="ml-1 text-white font-medium">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Brand: <span className="text-white">{product.brand || 'Generic'}</span></span>
          </div>

          <div className="mb-8 flex items-baseline gap-4">
            <span className="text-4xl font-extrabold text-white">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xl text-gray-500 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-6 mb-8 border-y border-gray-800 py-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-medium min-w-24">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-400 flex items-center gap-2">
                  <Package className="h-4 w-4" /> In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-400 font-medium">Out of Stock</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-medium min-w-24">Quantity:</span>
              <QuantitySelector 
                quantity={quantity} 
                max={product.stock} 
                onChange={setQuantity} 
              />
            </div>
          </div>

          <div className="mt-auto">
            <Button 
              size="lg" 
              className="w-full flex items-center justify-center gap-3 py-4 text-lg font-semibold"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-6 w-6" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="h-5 w-5 text-gray-400" />
              Secure transaction & free returns within 30 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
