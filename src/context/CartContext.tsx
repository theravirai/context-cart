import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, CartContextType } from '../types/cart';
import type { Product } from '../types/product';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CART_STORAGE_KEY = 'context-cart-cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>(CART_STORAGE_KEY, []);

  const addToCart = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        // Enforce max stock
        const newQuantity = Math.min(
          newItems[existingItemIndex].quantity + quantity, 
          product.stock
        );
        newItems[existingItemIndex].quantity = newQuantity;
        return newItems;
      }
      
      return [...prevItems, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    setItems((prevItems) => 
      prevItems.map(item => {
        if (item.product.id === productId) {
          // Enforce 1 to max stock boundaries
          const boundedQuantity = Math.max(1, Math.min(quantity, item.product.stock));
          return { ...item, quantity: boundedQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);

  const itemCount = items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
