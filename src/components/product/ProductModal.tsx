import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import type { Product, ProductInput, Category } from '../../types/product';
import { productService } from '../../services/productService';
import Button from '../common/Button';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (product: Product, isEdit: boolean) => void;
  productToEdit?: Product | null;
  availableCategories?: Category[];
}

const ProductModal = ({
  isOpen,
  onClose,
  onSuccess,
  productToEdit,
  availableCategories = [],
}: ProductModalProps) => {
  const isEdit = Boolean(productToEdit);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState<string>('');
  const [brand, setBrand] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState<string>('0');
  const [thumbnail, setThumbnail] = useState('');
  const [imagesText, setImagesText] = useState('');

  // Status & Error States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Sync form values when productToEdit changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(productToEdit.title || '');
        setDescription(productToEdit.description || '');
        setPrice(productToEdit.price ? productToEdit.price.toString() : '');
        setCategory(productToEdit.category || '');
        setStock(productToEdit.stock !== undefined ? productToEdit.stock.toString() : '');
        setBrand(productToEdit.brand || '');
        setDiscountPercentage(
          productToEdit.discountPercentage !== undefined
            ? productToEdit.discountPercentage.toString()
            : '0'
        );
        setThumbnail(productToEdit.thumbnail || '');
        setImagesText(
          Array.isArray(productToEdit.images) ? productToEdit.images.join('\n') : ''
        );
      } else {
        // Reset to default blank state for new product
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory(availableCategories[0]?.slug || '');
        setStock('10');
        setBrand('');
        setDiscountPercentage('0');
        setThumbnail('');
        setImagesText('');
      }
      setGeneralError(null);
      setFieldErrors({});
    }
  }, [isOpen, productToEdit, availableCategories]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});

    // Client-side quick check
    const errors: Record<string, string> = {};
    if (!title.trim()) errors.title = 'Title is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!price || isNaN(Number(price)) || Number(price) < 0) {
      errors.price = 'Price must be a valid number greater than or equal to 0';
    }
    if (!category.trim()) errors.category = 'Category is required';
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) {
      errors.stock = 'Stock must be a non-negative integer';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Process images list
    const images = imagesText
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    const payload: ProductInput = {
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category: category.trim().toLowerCase(),
      stock: parseInt(stock, 10),
      brand: brand.trim() || 'Generic',
      discountPercentage: discountPercentage ? parseFloat(discountPercentage) : 0,
      thumbnail: thumbnail.trim() || undefined,
      images: images.length > 0 ? images : undefined,
    };

    setIsSubmitting(true);

    try {
      if (isEdit && productToEdit) {
        const response = await productService.updateProduct(productToEdit.id, payload);
        onSuccess(response.product, true);
      } else {
        const response = await productService.createProduct(payload);
        onSuccess(response.product, false);
      }
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400 && Array.isArray(err.response.data?.errors)) {
          const mappedErrors: Record<string, string> = {};
          err.response.data.errors.forEach((errorItem: { field: string; message: string }) => {
            mappedErrors[errorItem.field] = errorItem.message;
          });
          setFieldErrors(mappedErrors);
        } else if (err.response?.status === 401) {
          setGeneralError('Your session has expired. Please sign in again to manage products.');
        } else {
          setGeneralError(err.response?.data?.message || 'Failed to save product. Please try again.');
        }
      } else if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError('An unexpected error occurred while saving the product.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        className="bg-card text-card-foreground border border-border w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-muted/20">
          <div>
            <h2 id="modal-title" className="text-xl font-bold text-foreground">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isEdit ? 'Update product information and stock' : 'Add a brand-new item to your catalog'}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-y-auto p-6 space-y-5">
          {/* General Error Banner */}
          {generalError && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-destructive">{generalError}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <label htmlFor="product-title" className="block text-sm font-medium text-foreground mb-1.5">
              Product Title <span className="text-destructive">*</span>
            </label>
            <input
              id="product-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Wireless Noise-Canceling Headphones"
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
                fieldErrors.title ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
              }`}
            />
            {fieldErrors.title && (
              <p className="mt-1 text-xs text-destructive font-medium">{fieldErrors.title}</p>
            )}
          </div>

          {/* Category & Brand (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="product-category" className="block text-sm font-medium text-foreground mb-1.5">
                Category <span className="text-destructive">*</span>
              </label>
              <input
                id="product-category"
                list="category-suggestions"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. electronics, accessories"
                className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
                  fieldErrors.category ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
                }`}
              />
              <datalist id="category-suggestions">
                {availableCategories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </datalist>
              {fieldErrors.category && (
                <p className="mt-1 text-xs text-destructive font-medium">{fieldErrors.category}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-brand" className="block text-sm font-medium text-foreground mb-1.5">
                Brand
              </label>
              <input
                id="product-brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. SonicPro (defaults to Generic)"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              />
            </div>
          </div>

          {/* Price, Stock, Discount (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="product-price" className="block text-sm font-medium text-foreground mb-1.5">
                Price ($) <span className="text-destructive">*</span>
              </label>
              <input
                id="product-price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29.99"
                className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
                  fieldErrors.price ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
                }`}
              />
              {fieldErrors.price && (
                <p className="mt-1 text-xs text-destructive font-medium">{fieldErrors.price}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-stock" className="block text-sm font-medium text-foreground mb-1.5">
                Stock Quantity <span className="text-destructive">*</span>
              </label>
              <input
                id="product-stock"
                type="number"
                step="1"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="50"
                className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
                  fieldErrors.stock ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
                }`}
              />
              {fieldErrors.stock && (
                <p className="mt-1 text-xs text-destructive font-medium">{fieldErrors.stock}</p>
              )}
            </div>

            <div>
              <label htmlFor="product-discount" className="block text-sm font-medium text-foreground mb-1.5">
                Discount (%)
              </label>
              <input
                id="product-discount"
                type="number"
                step="1"
                min="0"
                max="100"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="0"
                className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
                  fieldErrors.discountPercentage ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
                }`}
              />
              {fieldErrors.discountPercentage && (
                <p className="mt-1 text-xs text-destructive font-medium">{fieldErrors.discountPercentage}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="product-desc" className="block text-sm font-medium text-foreground mb-1.5">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="product-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of features, materials, and specifications..."
              className={`flex w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
                fieldErrors.description ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
              }`}
            />
            {fieldErrors.description && (
              <p className="mt-1 text-xs text-destructive font-medium">{fieldErrors.description}</p>
            )}
          </div>

          {/* Thumbnail URL & Image Preview */}
          <div>
            <label htmlFor="product-thumbnail" className="block text-sm font-medium text-foreground mb-1.5">
              Thumbnail Image URL
            </label>
            <div className="flex gap-3 items-start">
              <input
                id="product-thumbnail"
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              />
              <div className="w-10 h-10 rounded-md border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Provide a direct image link. If omitted, a clean placeholder will be generated.
            </p>
          </div>

          {/* Additional Images (One per line) */}
          <div>
            <label htmlFor="product-images" className="block text-sm font-medium text-foreground mb-1.5">
              Additional Image URLs (One per line)
            </label>
            <textarea
              id="product-images"
              rows={2}
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              placeholder="https://images.unsplash.com/photo-view-1...&#10;https://images.unsplash.com/photo-view-2..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="min-w-[130px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                'Update Product'
              ) : (
                'Create Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
