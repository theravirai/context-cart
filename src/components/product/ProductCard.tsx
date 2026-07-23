import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types/product';
import Button from '../common/Button';
import Badge from '../common/Badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-card text-card-foreground rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border flex flex-col h-full group/card relative">
      <Link to={`/products/${product.id}`} className="relative h-56 overflow-hidden block bg-white">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/5 transition-colors duration-500" />
        {product.discountPercentage > 10 && (
          <Badge variant="destructive" className="absolute top-3 left-3 shadow-md">
            Sale
          </Badge>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1.5 mb-5 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between flex-wrap gap-2">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <Button size="sm" className="flex items-center justify-center gap-2 flex-1 sm:flex-none transition-all" aria-label={`Add ${product.title} to cart`}>
            <ShoppingCart className="h-4 w-4 shrink-0" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
