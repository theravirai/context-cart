import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../../types/product';
import { productService } from '../../services/productService';
import ProductGrid from '../../components/product/ProductGrid';
import ProductCard from '../../components/product/ProductCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import Breadcrumbs from '../../components/common/Breadcrumbs';

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
        <Breadcrumbs 
          items={[
            { label: 'Categories', path: '/categories' },
            { label: slug ? slug.replace(/-/g, ' ') : 'Category' }
          ]} 
        />
        <h1 className="text-3xl font-bold text-foreground tracking-tight capitalize">
          {slug ? slug.replace(/-/g, ' ') : 'Category'} Products
        </h1>
        <p className="mt-2 text-muted-foreground">Viewing products in this category.</p>
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
        <div className="text-center py-20 bg-card rounded-lg border border-border">
          <h2 className="text-xl font-medium text-foreground mb-2">No products found</h2>
          <p className="text-muted-foreground">There are currently no products available in this category.</p>
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
