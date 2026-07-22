import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/common/Hero';
import CategoryCard from '../../components/category/CategoryCard';
import ProductCard from '../../components/product/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ProductGrid from '../../components/product/ProductGrid';
import { productService } from '../../services/productService';
import type { Category, Product } from '../../types/product';

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        // Fetch categories and products concurrently
        const [categoriesData, productsData] = await Promise.all([
          productService.getCategories(),
          productService.getProducts(4, 10) // Limit to 4, skip a few to feel like 'trending'
        ]);
        
        // Only show the first 4 categories on the home page
        setCategories(categoriesData.slice(0, 4));
        setProducts(productsData.products);
      } catch (error) {
        console.error('Failed to load home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="flex flex-col min-h-full w-full">
      <Hero />
      
      {/* Featured Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Featured Categories</h2>
            <p className="mt-2 text-gray-400">Shop by our most popular collections.</p>
          </div>
          <Link to="/categories" className="text-blue-400 hover:text-blue-300 font-medium whitespace-nowrap transition-colors">
            View All Categories &rarr;
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-800 rounded-lg animate-pulse border border-gray-700" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        )}
      </section>

      {/* Trending Products Section */}
      <section className="py-16 px-4 bg-gray-800/50 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Trending Products</h2>
              <p className="mt-2 text-gray-400">The latest and greatest right now.</p>
            </div>
            <Link to="/products" className="text-blue-400 hover:text-blue-300 font-medium whitespace-nowrap transition-colors">
              View All Products &rarr;
            </Link>
          </div>
          
          {loading ? (
            <ProductGrid>
              <LoadingSkeleton count={4} />
            </ProductGrid>
          ) : (
            <ProductGrid>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
