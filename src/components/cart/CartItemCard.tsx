import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types/cart';
import QuantitySelector from '../product/QuantitySelector';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItemCard = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-card border border-border rounded-lg transition-colors">
      <Link to={`/products/${product.id}`} className="shrink-0">
        <div className="w-24 h-24 bg-white rounded-md p-2 flex items-center justify-center overflow-hidden border border-border">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link to={`/products/${product.id}`} className="hover:underline">
          <h3 className="text-lg font-semibold text-card-foreground truncate">{product.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
        <div className="mt-2 text-lg font-medium text-primary">
          ${product.price.toFixed(2)}
        </div>
      </div>
      
      <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
        <QuantitySelector 
          quantity={quantity} 
          max={product.stock} 
          onChange={(newQuantity) => updateQuantity(product.id, newQuantity)}
        />
        
        <div className="text-right sm:ml-4 sm:w-24 font-bold text-foreground text-lg">
          ${(product.price * quantity).toFixed(2)}
        </div>
        
        <button 
          onClick={() => removeFromCart(product.id)}
          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
