import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onChange: (newQuantity: number) => void;
}

const QuantitySelector = ({ quantity, max, onChange }: QuantitySelectorProps) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-input rounded-md bg-background h-10 w-32 transition-colors">
      <button 
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="px-3 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors rounded-l-md"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      
      <div className="flex-1 flex items-center justify-center font-medium text-foreground border-x border-input h-full">
        {quantity}
      </div>
      
      <button 
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="px-3 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors rounded-r-md"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;
