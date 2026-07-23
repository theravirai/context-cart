import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../../components/common/Button';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Have a question about an order, our products, or just want to say hi? 
            Fill out the form and our customer service team will get back to you as soon as possible.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Email</h3>
                <p className="mt-1 text-muted-foreground">support@contextcart.com</p>
                <p className="mt-1 text-sm text-muted-foreground">We aim to reply within 24 hours.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Phone className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Phone</h3>
                <p className="mt-1 text-muted-foreground">+1 (555) 123-4567</p>
                <p className="mt-1 text-sm text-muted-foreground">Mon-Fri, 9am to 6pm EST.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-foreground">Office</h3>
                <p className="mt-1 text-muted-foreground">123 E-Commerce Blvd</p>
                <p className="mt-1 text-muted-foreground">Tech City, TC 94016</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground p-8 rounded-2xl border border-border shadow-sm">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                placeholder="jane@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <Button type="submit" className="w-full flex items-center justify-center gap-2 h-12 text-base">
              <Send className="h-5 w-5" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
