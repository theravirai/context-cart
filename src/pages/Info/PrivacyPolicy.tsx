const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-8">
        Privacy Policy
      </h1>
      
      <div className="text-muted-foreground space-y-8 leading-relaxed">
        <p>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you create an account, make a purchase, 
            subscribe to our newsletter, or contact our customer support. This information may include your name, email 
            address, phone number, shipping address, and payment information.
          </p>
          <p>
            We also automatically collect certain information about your device and how you interact with our website, 
            including your IP address, browser type, and browsing behavior.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders, including sending order confirmations and tracking information.</li>
            <li>Communicate with you about products, services, offers, and promotions.</li>
            <li>Provide customer support and respond to your inquiries.</li>
            <li>Analyze and improve our website's performance and user experience.</li>
            <li>Detect and prevent fraud or abuse of our services.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Information Sharing</h2>
          <p>
            We do not sell your personal information to third parties. We may share your information with trusted service 
            providers who assist us in operating our website, processing payments, or delivering orders, provided that 
            these parties agree to keep this information confidential.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, 
            alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 
            100% secure, and we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">5. Your Choices</h2>
          <p>
            You can access, update, or delete your account information at any time by logging into your account settings. 
            You may also opt-out of receiving promotional emails from us by following the unsubscribe instructions 
            included in those emails.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
