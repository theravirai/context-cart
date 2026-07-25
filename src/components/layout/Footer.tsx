import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Mail, Phone } from 'lucide-react';
import Button from '../common/Button';

const Footer = () => {
  return (
    <footer className="bg-background text-muted-foreground py-12 border-t border-border mt-auto transition-colors">
      <div className="container mx-auto px-4">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-foreground text-lg font-bold mb-4">Context Cart</h3>
            <p className="text-sm leading-relaxed mb-6">
              Your one-stop destination for everything you need. Modern e-commerce platform built for the future.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Website" className="hover:text-foreground transition-colors">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Contact" className="hover:text-foreground transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Email" className="hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Phone" className="hover:text-foreground transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 tracking-wide uppercase text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">My Account</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 tracking-wide uppercase text-sm">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Information</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 tracking-wide uppercase text-sm">Newsletter</h4>
            <p className="text-sm mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground transition-colors"
                required
              />
              <Button type="submit" variant="primary" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-border pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center transition-colors">
          <p>&copy; {new Date().getFullYear()} Context Cart. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
