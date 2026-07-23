const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-8">
        Terms of Service
      </h1>
      
      <div className="text-muted-foreground space-y-8 leading-relaxed">
        <p>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Context Cart website and services, you agree to be bound by these Terms of Service. 
            If you do not agree to all of the terms and conditions, you may not access the website or use any services.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Use of Service</h2>
          <p>
            You may use our services only as permitted by law. You agree not to misuse our services or help anyone else 
            do so. We may suspend or stop providing our services to you if you do not comply with our terms or policies.
          </p>
          <p>
            You must be at least 18 years old to make a purchase on our platform.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Products and Pricing</h2>
          <p>
            All products and prices are subject to change without notice. We reserve the right to modify or discontinue 
            any product at any time. We have made every effort to display as accurately as possible the colors and images 
            of our products, but we cannot guarantee that your computer monitor's display will be accurate.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">4. Payment and Billing</h2>
          <p>
            By providing a payment method, you represent and warrant that you are authorized to use the designated payment 
            method and that you authorize us (or our third-party payment processor) to charge your payment method for the 
            total amount of your purchase (including any applicable taxes and other charges).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">5. Limitation of Liability</h2>
          <p>
            In no event shall Context Cart, its directors, employees, or partners be liable for any indirect, incidental, 
            special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
            or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. It is your responsibility to check this 
            page periodically for changes. Your continued use of the website following the posting of any changes 
            constitutes acceptance of those changes.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
