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
  const [topRated, setTopRated] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [categoriesData, topRatedData, newArrivalsData] = await Promise.all([
          productService.getCategories(),
          productService.getProducts(4, 0, 'rating', 'desc'),
          productService.getProducts(4, 0, 'meta.createdAt', 'desc')
        ]);
        
        setCategories(categoriesData.slice(0, 4));
        setTopRated(topRatedData.products);
        setNewArrivals(newArrivalsData.products);
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
      
      {/* Top Rated Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">Top Rated</h2>
            <p className="mt-2 text-muted-foreground">Our highest-rated premium selections.</p>
          </div>
          <Link to="/products" className="text-primary hover:text-primary/80 font-medium whitespace-nowrap transition-colors">
            View All Products &rarr;
          </Link>
        </div>
        
        {loading ? (
          <ProductGrid>
            <LoadingSkeleton count={4} />
          </ProductGrid>
        ) : (
          <ProductGrid>
            {topRated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        )}
      </section>

      {/* Shop By Category Section */}
      <section className="py-16 px-4 bg-muted/30 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Shop by Category</h2>
              <p className="mt-2 text-muted-foreground">Explore our curated collections.</p>
            </div>
            <Link to="/categories" className="text-primary hover:text-primary/80 font-medium whitespace-nowrap transition-colors">
              View All Categories &rarr;
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg animate-pulse border border-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground tracking-tight">New Arrivals</h2>
            <p className="mt-2 text-muted-foreground">The latest and greatest right now.</p>
          </div>
          <Link to="/products" className="text-primary hover:text-primary/80 font-medium whitespace-nowrap transition-colors">
            View All Products &rarr;
          </Link>
        </div>
        
        {loading ? (
          <ProductGrid>
            <LoadingSkeleton count={4} />
          </ProductGrid>
        ) : (
          <ProductGrid>
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        )}
      </section>
    </div>
  );
};

export default Home;
