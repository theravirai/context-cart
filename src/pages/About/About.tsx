import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Shield, Smartphone } from 'lucide-react';
import Button from '../../components/common/Button';

const About = () => {
  const features = [
    {
      name: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and Tailwind CSS for a seamless developer and user experience.',
      icon: Code,
    },
    {
      name: 'Lightning Fast',
      description: 'Optimized rendering and intelligent data fetching ensures pages load instantly.',
      icon: Zap,
    },
    {
      name: 'Secure by Design',
      description: 'Ready to integrate with enterprise-grade authentication and robust backend services.',
      icon: Shield,
    },
    {
      name: 'Fully Responsive',
      description: 'Flawless layouts that adapt perfectly whether you are on a desktop, tablet, or mobile phone.',
      icon: Smartphone,
    },
  ];

  return (
    <div className="bg-background min-h-screen pb-16 transition-colors">
      {/* Hero Section */}
      <div className="relative py-24 sm:py-32 overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            About <span className="text-primary">Context Cart</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Context Cart is a modern, high-performance e-commerce platform built to demonstrate production-ready software engineering practices. 
            Designed from the ground up for speed, scalability, and an exceptional user experience.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/products">
              <Button size="lg" className="flex items-center gap-2">
                Start Shopping <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50 pointer-events-none"></div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary uppercase tracking-wider">Our Vision</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Building the future of e-commerce
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Phase 1 focuses on delivering a polished, blazing fast frontend storefront. Future phases will introduce a custom FastAPI backend, intelligent semantic search, and AI-powered autonomous customer support agents.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-card border border-border shadow-sm">
                  <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <dt className="text-xl font-semibold leading-7 text-foreground">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default About;
