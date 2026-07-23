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
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-700 flex flex-col h-full">
      <Link to={`/products/${product.id}`} className="relative h-48 overflow-hidden block bg-white group">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.discountPercentage > 10 && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Sale
          </Badge>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="hover:text-blue-400 transition-colors">
          <h3 className="font-semibold text-lg text-white line-clamp-1">{product.title}</h3>
        </Link>
        <p className="text-sm text-gray-400 mt-1 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-700 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
          <Button size="sm" className="flex items-center justify-center gap-2 flex-1 sm:flex-none" aria-label={`Add ${product.title} to cart`}>
            <ShoppingCart className="h-4 w-4 shrink-0" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
