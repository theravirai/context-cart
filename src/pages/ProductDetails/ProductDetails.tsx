import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { productService } from '../../services/productService';
import { ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(id);
        setProduct(data);
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
      <div className="container mx-auto px-4 py-8 max-w-7xl animate-pulse flex flex-col md:flex-row gap-8 mt-8">
        <div className="w-full md:w-1/2 h-96 bg-gray-800 rounded-lg"></div>
        <div className="w-full md:w-1/2 space-y-4">
          <div className="h-10 bg-gray-800 rounded w-3/4"></div>
          <div className="h-6 bg-gray-800 rounded w-1/4"></div>
          <div className="h-32 bg-gray-800 rounded w-full"></div>
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
      </Link>
      
      <div className="text-white bg-gray-800 p-8 rounded-lg border border-gray-700">
        {/* Placeholder for Task 3 refined UI */}
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-2xl font-semibold text-blue-400 mb-6">${product.price.toFixed(2)}</p>
        <p className="text-gray-300">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
