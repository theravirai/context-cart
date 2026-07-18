import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import Badge from '../common/Badge';

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo and Primary Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold tracking-wider text-blue-400">
            Context Cart
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
            <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <SearchBar />
        </div>

        {/* Secondary Links & Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Login</span>
          </Link>
          
          <Link to="/cart" className="relative text-gray-300 hover:text-white transition-colors flex items-center">
            <ShoppingCart className="h-6 w-6" />
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              3
            </Badge>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
