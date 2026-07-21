import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Product } from '../../types/product';
import { productService } from '../../services/productService';
import ProductGrid from '../../components/product/ProductGrid';
import ProductCard from '../../components/product/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

const CategoryProducts = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await productService.getProductsByCategory(slug);
        setProducts(response.products);
      } catch (err) {
        console.error(`Failed to fetch products for category ${slug}:`, err);
        setError('Failed to load products for this category. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <Link to="/categories" className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Categories
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight capitalize">
          {slug ? slug.replace(/-/g, ' ') : 'Category'} Products
        </h1>
        <p className="mt-2 text-gray-400">Viewing products in this category.</p>
      </div>

      {loading ? (
        <ProductGrid>
          <LoadingSkeleton count={8} />
        </ProductGrid>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-xl font-medium text-white mb-2">No products found</h2>
          <p className="text-gray-400">There are currently no products available in this category.</p>
        </div>
      ) : (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      )}
    </div>
  );
};

export default CategoryProducts;
