import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../../types/product';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail if button is inside a link
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border flex flex-col h-full group/card relative">
      <div className="relative h-56 overflow-hidden block bg-white">
        <Link to={`/products/${product.id}`} className="w-full h-full block">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 transition-colors duration-500" />
        </Link>
        {product.discountPercentage > 10 && (
          <Badge variant="destructive" className="absolute top-3 left-3 shadow-md pointer-events-none">
            Sale
          </Badge>
        )}
        {(onEdit || onDelete) && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(product);
                }}
                className="p-1.5 bg-background/90 hover:bg-background text-foreground backdrop-blur-xs rounded-md shadow-md border border-border/60 transition-all hover:scale-105"
                title="Edit product"
                aria-label={`Edit ${product.title}`}
              >
                <Pencil className="h-3.5 w-3.5 text-foreground" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(product);
                }}
                className="p-1.5 bg-background/90 hover:bg-destructive text-destructive hover:text-white backdrop-blur-xs rounded-md shadow-md border border-border/60 transition-all hover:scale-105"
                title="Delete product"
                aria-label={`Delete ${product.title}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1.5 mb-5 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between flex-wrap gap-2">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <Button 
            size="sm" 
            className={`flex items-center justify-center gap-2 flex-1 sm:flex-none transition-all duration-300 ${isAdded ? 'bg-green-600 hover:bg-green-700 text-white !border-green-600' : ''}`} 
            aria-label={`Add ${product.title} to cart`}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 shrink-0" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 shrink-0" />
                <span>Add</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
