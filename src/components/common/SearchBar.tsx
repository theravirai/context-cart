import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
import { productService } from '../../services/productService';
import type { Product } from '../../types/product';

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keep input in sync if the URL search parameter changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchTerm(searchParams.get('q') || '');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowDropdown(false); // Hide dropdown on navigation
  }, [searchParams]);

  // Debounced live search
  useEffect(() => {
    const query = searchTerm.trim();
    if (!query) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      return;
    }

    // Don't run search if we just synced from URL to avoid immediate dropdown opening on navigation
    if (query === searchParams.get('q')) {
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await productService.searchProducts(query);
        setSuggestions(response.products.slice(0, 5)); // Show up to 5 results
        setShowDropdown(true);
      } catch (error) {
        console.error('Live search failed:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowDropdown(false);
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (searchTerm.trim() && suggestions.length > 0) {
              setShowDropdown(true);
            }
          }}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          placeholder="Search products..."
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
          </div>
        )}
      </form>

      {/* Live Search Dropdown */}
      {showDropdown && (searchTerm.trim() !== '') && (
        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.length > 0 ? (
            <div className="flex flex-col">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b border-border/50 last:border-0"
                >
                  <div className="h-10 w-10 shrink-0 bg-white rounded flex items-center justify-center p-1 border border-border/50">
                    <img 
                      src={product.thumbnail} 
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.title}</p>
                    <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                  </div>
                  <div className="text-sm font-semibold text-primary shrink-0">
                    ${product.price.toFixed(2)}
                  </div>
                </Link>
              ))}
              <button
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
                className="p-3 text-sm text-center font-medium text-primary hover:text-primary/80 hover:bg-muted transition-colors bg-muted/30"
              >
                View all results for "{searchTerm}"
              </button>
            </div>
          ) : !isSearching ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No products found for "{searchTerm}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
