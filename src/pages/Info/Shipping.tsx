const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 max-w-4xl">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-8">
        Shipping Information
      </h1>
      
      <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm p-8 sm:p-12">
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          We pride ourselves on fast, reliable shipping. All orders are processed within 1-2 business days. 
          Orders are not shipped or delivered on weekends or holidays.
        </p>

        <h2 className="text-2xl font-bold text-foreground mb-6">Domestic Shipping Rates</h2>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 px-4 font-semibold">Shipping Method</th>
                <th className="py-4 px-4 font-semibold">Estimated Delivery</th>
                <th className="py-4 px-4 font-semibold text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-4 px-4">Standard Shipping</td>
                <td className="py-4 px-4">3-5 business days</td>
                <td className="py-4 px-4 text-right">Free over $50</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4">Priority Shipping</td>
                <td className="py-4 px-4">2-3 business days</td>
                <td className="py-4 px-4 text-right">$9.99</td>
              </tr>
              <tr>
                <td className="py-4 px-4">Express Next-Day</td>
                <td className="py-4 px-4">1 business day</td>
                <td className="py-4 px-4 text-right">$24.99</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-4">International Shipping</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          We offer worldwide shipping to over 100 countries. International shipping rates are calculated at checkout 
          based on the destination and the weight of the package.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Please note that international customers are responsible for any customs duties, taxes, or fees levied 
          by their destination country.
        </p>
      </div>
    </div>
  );
};

export default Shipping;
