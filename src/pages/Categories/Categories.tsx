import { useEffect, useState } from 'react';
import type { Category } from '../../types/product';
import { productService } from '../../services/productService';
import CategoryCard from '../../components/category/CategoryCard';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Categories</h1>
        <p className="mt-2 text-gray-400">Find exactly what you're looking for.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="h-32 bg-gray-800 rounded-lg animate-pulse border border-gray-700" />
          ))}
        </div>
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
      ) : categories.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-xl font-medium text-white mb-2">No categories found</h2>
          <p className="text-gray-400">Check back later for updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
