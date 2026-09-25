import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Product, Category } from '../../types/product';
import { productService } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Package,
  ShieldCheck,
  Check,
  Pencil,
  Trash2,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import QuantitySelector from '../../components/product/QuantitySelector';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useCart } from '../../context/CartContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductModal from '../../components/product/ProductModal';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  // Management State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const [productData, categoryData] = await Promise.all([
          productService.getProductById(id),
          productService.getCategories(),
        ]);
        setProduct(productData);
        setCategories(categoryData);
        setActiveImage(
          (productData.images && productData.images.length > 0)
            ? productData.images[0]
            : productData.thumbnail
        );
        setQuantity(1);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError('Failed to load product details. It may not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndCategories();
  }, [id]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProduct(updatedProduct);
    setActiveImage(
      (updatedProduct.images && updatedProduct.images.length > 0)
        ? updatedProduct.images[0]
        : updatedProduct.thumbnail
    );
    showNotification('success', 'Product details updated successfully.');
  };

  const handleConfirmDelete = async () => {
    if (!product) return;

    try {
      setIsDeleting(true);
      await productService.deleteProduct(product.id);
      setIsDeleteDialogOpen(false);
      navigate('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
      showNotification('error', 'Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl animate-pulse flex flex-col lg:flex-row gap-12 mt-8">
        <div className="w-full lg:w-1/2 h-[500px] bg-muted rounded-lg border border-border"></div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="h-10 bg-muted rounded w-3/4"></div>
          <div className="h-6 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded w-full"></div>
          <div className="h-12 bg-muted rounded w-1/2"></div>
          <div className="h-12 bg-muted rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
        <h2 className="text-2xl font-bold text-destructive mb-4">Oops!</h2>
        <p className="text-muted-foreground mb-8">{error || 'Product not found.'}</p>
        <Link
          to="/products"
          className="text-primary hover:text-primary/80 underline flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </div>
    );
  }

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

      {/* Top Bar: Breadcrumbs & Authenticated Admin Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Breadcrumbs
          items={[
            { label: 'Products', path: '/products' },
            {
              label: product.category.replace(/-/g, ' '),
              path: `/categories/${product.category}`,
            },
            { label: product.title },
          ]}
        />

        {isAuthenticated && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-1.5"
            >
              <Pencil className="h-4 w-4 text-foreground" />
              <span>Edit</span>
            </Button>
            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Image Gallery */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="bg-white rounded-xl overflow-hidden h-[400px] sm:h-[500px] border border-border flex items-center justify-center p-4 relative">
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
                  className={`flex-shrink-0 w-24 h-24 bg-white rounded-md border-2 overflow-hidden ${
                    activeImage === img
                      ? 'border-primary'
                      : 'border-border hover:border-muted-foreground'
                  } transition-colors p-1`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Link
              to={`/categories/${product.category}`}
              className="text-primary hover:underline text-sm font-medium uppercase tracking-wider"
            >
              {product.category}
            </Link>
            {product.discountPercentage > 10 && (
              <Badge variant="destructive">On Sale</Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400">
              <Star className="h-5 w-5 fill-current" />
              <span className="ml-1 text-foreground font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-muted-foreground">|</span>
            <span className="text-muted-foreground">
              Brand: <span className="text-foreground">{product.brand || 'Generic'}</span>
            </span>
          </div>

          <div className="mb-8 flex items-baseline gap-4">
            <span className="text-4xl font-extrabold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xl text-muted-foreground line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="space-y-6 mb-8 border-y border-border py-6">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground font-medium min-w-24">
                Availability:
              </span>
              {product.stock > 0 ? (
                <span className="text-green-500 flex items-center gap-2 font-medium">
                  <Package className="h-4 w-4" /> In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-destructive font-medium">Out of Stock</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground font-medium min-w-24">
                Quantity:
              </span>
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
              className={`w-full flex items-center justify-center gap-3 py-4 text-lg font-semibold transition-all duration-300 ${
                isAdded
                  ? 'bg-green-600 hover:bg-green-700 text-white !border-green-600'
                  : ''
              }`}
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {isAdded ? (
                <>
                  <Check className="h-6 w-6" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-6 w-6" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </>
              )}
            </Button>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5" />
              Secure transaction & free returns within 30 days
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      <ProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleProductUpdated}
        productToEdit={product}
        availableCategories={categories}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => {
            if (!isDeleting) setIsDeleteDialogOpen(false);
          }}
        >
          <div
            className="bg-card text-card-foreground border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 animate-in zoom-in-95 duration-200"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
          >
            <div className="flex items-center gap-3 text-destructive mb-3">
              <div className="p-2 bg-destructive/10 rounded-full">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 id="delete-dialog-title" className="text-lg font-bold">
                Delete Product
              </h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-foreground font-semibold">
                "{product.title}"
              </strong>
              ? This action cannot be undone and will remove it from the store catalog.
            </p>

            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                disabled={isDeleting}
                onClick={() => setIsDeleteDialogOpen(false)}
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

export default ProductDetails;
