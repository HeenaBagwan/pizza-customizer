import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-200 border-t-green-500 border-r-lime-500" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
      </div>

      <div className="mt-6 space-y-2 text-center">
        <h3 className="text-xl font-bold text-gray-800 animate-pulse">
          Preparing Your Menu...
        </h3>
        <p className="text-sm text-gray-500">
          Getting the freshest pizzas ready for you
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
        <div className="w-2 h-2 bg-lime-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
      </div>
    </div>
  );
}