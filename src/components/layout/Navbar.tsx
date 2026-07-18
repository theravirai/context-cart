import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wider">
          Context Cart
        </Link>
        <nav className="space-x-6">
          <Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link>
          <Link to="/categories" className="hover:text-blue-400 transition-colors">Categories</Link>
          <Link to="/cart" className="hover:text-blue-400 transition-colors">Cart</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
