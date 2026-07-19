import Hero from '../../components/common/Hero';

const Home = () => {
  return (
    <div className="flex flex-col min-h-full w-full">
      <Hero />
      
      {/* Featured Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Featured Categories</h2>
            <p className="mt-2 text-gray-400">Shop by our most popular collections.</p>
          </div>
        </div>
        
        {/* Placeholder for Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-800 rounded-lg animate-pulse flex items-center justify-center text-gray-500 border border-gray-700">
              Category Card
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-16 px-4 bg-gray-800/50 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Trending Products</h2>
              <p className="mt-2 text-gray-400">The latest and greatest right now.</p>
            </div>
          </div>
          
          {/* Placeholder for Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-gray-800 rounded-lg animate-pulse flex items-center justify-center text-gray-500 border border-gray-700">
                Product Card
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
