import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest select-none">
        404
      </h1>
      <div className="bg-blue-500 text-white px-2 py-1 text-sm font-bold rounded rotate-12 absolute top-1/2 -mt-16 sm:-mt-20">
        Page Not Found
      </div>
      
      <div className="mt-8 space-y-4 z-10">
        <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
          Whoops! You're lost in space.
        </h2>
        <p className="text-lg text-gray-400 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center z-10 w-full sm:w-auto">
        <Link to="/" className="w-full sm:w-auto">
          <Button size="lg" className="flex items-center justify-center gap-2 w-full">
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </Link>
        <Link to="/products" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="flex items-center justify-center gap-2 w-full">
            <Search className="h-5 w-5" />
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
