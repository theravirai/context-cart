const Returns = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-8">
        Returns & Exchanges
      </h1>
      
      <div className="max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We want you to be completely satisfied with your purchase. If you are not entirely happy with your order, 
          we're here to help. Our straightforward returns policy is designed to give you peace of mind.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">30-Day Return Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have 30 calendar days to return an item from the date you received it. To be eligible for a return, 
              your item must be unused, in the same condition that you received it, and in its original packaging.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Please include the original receipt or proof of purchase with your return.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Initiate a Return</h2>
            <ol className="list-decimal list-inside text-muted-foreground space-y-3 pl-4">
              <li>Log into your account and navigate to your Order History.</li>
              <li>Select the item(s) you wish to return and click "Initiate Return".</li>
              <li>Print the generated prepaid shipping label.</li>
              <li>Package the items securely and attach the label.</li>
              <li>Drop off the package at any authorized shipping location.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Once we receive your item, we will inspect it and notify you that we have received your returned item. 
              If your return is approved, we will initiate a refund to your credit card (or original method of payment). 
              You will receive the credit within a certain amount of days, depending on your card issuer's policies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Returns;
