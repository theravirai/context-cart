import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItemCard from '../../components/cart/CartItemCard';
import Button from '../../components/common/Button';

const Cart = () => {
  const { items, cartTotal, clearCart } = useCart();
  const tax = cartTotal * 0.08; // Mock 8% tax
  const shipping = cartTotal > 50 ? 0 : 10; // Free shipping over $50
  const finalTotal = cartTotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
        <div className="flex flex-col items-center justify-center p-12 bg-gray-800 rounded-xl border border-gray-700">
          <ShoppingBag className="h-20 w-20 text-gray-500 mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Discover our amazing products and start shopping!
          </p>
          <Link to="/products">
            <Button size="lg" className="flex items-center gap-2">
              Start Shopping <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Shopping Cart</h1>
          <p className="mt-2 text-gray-400">Review your items before checkout.</p>
        </div>
        <button 
          onClick={clearCart}
          className="text-sm font-medium text-red-400 hover:text-red-300 hover:underline transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Cart Items */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <CartItemCard key={item.product.id} item={item} />
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between items-center text-white">
                <span className="text-lg font-medium">Total</span>
                <span className="text-2xl font-bold text-blue-400">${finalTotal.toFixed(2)}</span>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-green-400 mt-2 text-right">
                  Includes free shipping!
                </p>
              )}
            </div>

            <Button size="lg" className="w-full text-lg py-4">
              Proceed to Checkout
            </Button>
            
            <div className="mt-6 text-center">
              <Link to="/products" className="text-sm font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                or Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
