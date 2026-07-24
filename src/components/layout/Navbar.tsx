import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Sun, Moon } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import Badge from '../common/Badge';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-wider text-primary flex items-center gap-3 group">
            <img src="/logo.jpg" alt="Context Cart Logo" className="h-8 w-8 rounded-md object-cover group-hover:scale-110 transition-transform" />
            Context Cart
          </Link>
          {/* Desktop Primary Links */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
            <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link>
          </nav>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <SearchBar />
        </div>

        {/* Desktop Secondary Links & Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={toggleTheme}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link to="/login" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Login</span>
          </Link>
          
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors flex items-center">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                {itemCount}
              </Badge>
            )}
          </Link>
        </div>

        {/* Mobile Menu Toggle & Cart Icon */}
        <div className="flex md:hidden items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors flex items-center">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                {itemCount}
              </Badge>
            )}
          </Link>
          <button 
            onClick={toggleMenu} 
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <SearchBar />
            <nav className="flex flex-col space-y-4 pt-2">
              <Link onClick={toggleMenu} to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
              <Link onClick={toggleMenu} to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link>
              <Link onClick={toggleMenu} to="/login" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
