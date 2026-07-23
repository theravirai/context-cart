const FAQ = () => {
  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are securely processed and encrypted.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days. Express shipping (1-2 business days) is available at checkout for an additional fee.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination.'
    },
    {
      question: 'Can I change or cancel my order?',
      answer: 'Orders can be modified or canceled within 2 hours of placement. After this window, the order is processed for shipping and cannot be changed.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you will receive a confirmation email containing a tracking number and a link to monitor your delivery status.'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions about our products and services.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card text-card-foreground p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
            <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
