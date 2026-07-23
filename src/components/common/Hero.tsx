import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

const Hero = () => {
  return (
    <div className="relative bg-background overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-16 sm:pt-24 lg:pt-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Everything you need.</span>{' '}
                <span className="block text-primary xl:inline">Right in context.</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover our curated collection of premium products. 
                Experience a modern e-commerce platform built for speed, simplicity, and style.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <Link to="/products">
                  <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 group">
                    Shop Collection
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/categories">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Browse Categories
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Decorative background element for large screens */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-muted/20 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background/50 to-background"></div>
      </div>
    </div>
  );
};

export default Hero;
