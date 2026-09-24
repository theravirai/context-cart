import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, AlertTriangle, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Product, Category } from '../../types/product';
import { productService } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import ProductGrid from '../../components/product/ProductGrid';
import ProductCard from '../../components/product/ProductCard';
import ProductModal from '../../components/product/ProductModal';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import Button from '../../components/common/Button';

const Products = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { isAuthenticated } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  // Delete Confirmation States
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast / Banner Notification
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Fetch products & categories
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productRes, categoryRes] = await Promise.all([
          query ? productService.searchProducts(query) : productService.getProducts(50, 0),
          productService.getCategories(),
        ]);

        setProducts(productRes.products);
        setCategories(categoryRes);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, [query]);

  // Show temporary toast notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Add Product Handler
  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  // Edit Product Handler
  const handleOpenEditModal = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  // Successful Add/Edit Callback
  const handleProductSaved = (savedProduct: Product, isEdit: boolean) => {
    if (isEdit) {
      setProducts((prev) =>
        prev.map((item) => (item.id === savedProduct.id ? savedProduct : item))
      );
      showNotification('success', `Product "${savedProduct.title}" updated successfully.`);
    } else {
      setProducts((prev) => [savedProduct, ...prev]);
      showNotification('success', `Product "${savedProduct.title}" created successfully.`);
    }
  };

  // Confirm Delete Execution
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      await productService.deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((item) => item.id !== productToDelete.id));
      showNotification('success', `Product "${productToDelete.title}" deleted successfully.`);
      setProductToDelete(null);
    } catch (err) {
      console.error('Failed to delete product:', err);
      showNotification('error', 'Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white text-sm font-medium animate-in slide-in-from-bottom-5 duration-300 ${
            notification.type === 'success' ? 'bg-emerald-600' : 'bg-destructive'
          }`}
          role="alert"
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header with Title and Add Product Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            {query ? `Search Results for "${query}"` : 'All Products'}
          </h1>
          <p className="mt-1 text-muted-foreground text-sm">
            {query && !loading
              ? `Found ${products.length} result${products.length === 1 ? '' : 's'}`
              : query
              ? 'Searching catalog...'
              : 'Browse our complete catalog.'}
          </p>
        </div>

        {isAuthenticated && (
          <Button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 self-start sm:self-auto shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        )}
      </div>

      {/* Products Grid / Loading / Error State */}
      {loading ? (
        <ProductGrid>
          <LoadingSkeleton count={12} />
        </ProductGrid>
      ) : error ? (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-8 text-center max-w-md mx-auto">
          <p className="text-destructive font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-destructive hover:bg-destructive/90 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-xs">
          <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            {query
              ? 'Try adjusting your search terms or browsing different categories.'
              : 'Check back later for new arrivals or add the first product!'}
          </p>
          {isAuthenticated && (
            <Button onClick={handleOpenAddModal} className="mt-6 inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Create First Product</span>
            </Button>
          )}
        </div>
      ) : (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={isAuthenticated ? handleOpenEditModal : undefined}
              onDelete={isAuthenticated ? setProductToDelete : undefined}
            />
          ))}
        </ProductGrid>
      )}

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleProductSaved}
        productToEdit={productToEdit}
        availableCategories={categories}
      />

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => {
            if (!isDeleting) setProductToDelete(null);
          }}
        >
          <div
            className="bg-card text-card-foreground border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-200"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
          >
            <div className="flex items-center gap-3 text-destructive mb-3">
              <div className="p-2 bg-destructive/10 rounded-full">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 id="delete-title" className="text-lg font-bold">
                Delete Product
              </h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-foreground font-semibold">
                "{productToDelete.title}"
              </strong>
              ? This action cannot be undone and will remove it from the catalog.
            </p>

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                disabled={isDeleting}
                onClick={() => setProductToDelete(null)}
              >
                Cancel
              </Button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-destructive hover:bg-destructive/90 text-white transition-colors disabled:opacity-50 min-w-[90px]"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
