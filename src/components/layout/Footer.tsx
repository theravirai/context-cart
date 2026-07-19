import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Context Cart</h3>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for everything you need. Modern e-commerce platform built for the future.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-blue-400 transition-colors">Shop All</Link></li>
              <li><Link to="/categories" className="hover:text-blue-400 transition-colors">Categories</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/login" className="hover:text-blue-400 transition-colors">My Account</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              <li><Link to="/returns" className="hover:text-blue-400 transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/shipping" className="hover:text-blue-400 transition-colors">Shipping Information</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Placeholder for Newsletter */}
          <div>
            {/* Newsletter will go here */}
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Context Cart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
