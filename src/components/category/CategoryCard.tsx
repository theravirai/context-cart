import { Link } from 'react-router-dom';
import type { Category } from '../../types/product';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link 
      to={`/categories/${category.slug}`}
      className="group bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
        {category.name}
      </h3>
      <span className="text-sm text-muted-foreground flex items-center gap-1 group-hover:text-foreground">
        Browse <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
};

export default CategoryCard;
