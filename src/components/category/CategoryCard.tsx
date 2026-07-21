import { Link } from 'react-router-dom';
import { Category } from '../../types/product';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/categories/${category.slug}`}
      className="group bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-750 hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-blue-900/20"
    >
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {category.name}
      </h3>
      <span className="text-sm text-gray-400 flex items-center gap-1 group-hover:text-gray-300">
        Browse <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
};

export default CategoryCard;
