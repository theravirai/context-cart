const LoadingSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse border border-gray-700">
          <div className="h-48 bg-gray-700 w-full" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
            <div className="pt-4 flex justify-between items-center">
              <div className="h-6 bg-gray-700 rounded w-1/3" />
              <div className="h-8 bg-gray-700 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
