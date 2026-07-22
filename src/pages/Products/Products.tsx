import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product } from '../../types/product';
import { productService } from '../../services/productService';
import ProductGrid from '../../components/product/ProductGrid';
import ProductCard from '../../components/product/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

const Products = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        if (query) {
          response = await productService.searchProducts(query);
        } else {
          // Using a limit of 24 to fill 4 columns nicely (24/4 = 6 rows)
          response = await productService.getProducts(24, 0);
        }
        
        setProducts(response.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {query ? `Search Results for "${query}"` : 'All Products'}
        </h1>
        <p className="mt-2 text-gray-400">
          {query && !loading ? `Found ${products.length} result${products.length === 1 ? '' : 's'}` : query ? 'Searching...' : 'Browse our complete collection.'}
        </p>
      </div>

      {loading ? (
        <ProductGrid>
          <LoadingSkeleton count={12} />
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
          <p className="text-gray-400">
            {query ? 'Try adjusting your search terms or browsing our categories.' : 'Check back later for new arrivals.'}
          </p>
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

export default Products;
