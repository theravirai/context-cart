import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'destructive' | 'outline';
  className?: string;
}

const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'text-gray-200 border border-gray-600',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Badge;
