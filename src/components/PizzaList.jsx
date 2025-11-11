import React from 'react';
import PizzaCard from './PizzaCard'; 

export default function PizzaList({ pizzas, onCustomize }) {
  if (!pizzas?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🍕</div>
        <p className="text-xl text-gray-600 font-medium">No pizzas available</p>
      </div>
    );
  }

  // Duplicate pizzas for display
  const displayPizzas = Array(4).fill(pizzas).flat();

  return (
    <div className="space-y-8">

      <div className="text-center relative px-4 sm:px-8 lg:px-32  mt-8">
        <div className="inline-block relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 relative z-10">
            Our Pizza Menu
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-3 sm:h-4 bg-orange-400 opacity-30 -rotate-1 z-0"></div>
        </div>
        <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg">
          Handcrafted perfection in every slice
        </p>
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4">
          <div className="h-px w-12 sm:w-16 bg-orange-300"></div>
          <span className="text-xs sm:text-sm text-orange-600 font-medium">
            {displayPizzas.length} Varieties
          </span>
          <div className="h-px w-12 sm:w-16 bg-orange-300"></div>
        </div>
      </div>

      
      <div className="px-4 sm:px-8 lg:px-32 pb-24 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {displayPizzas.map((p, idx) => (
          <PizzaCard key={idx} pizza={p} onCustomize={onCustomize} />
        ))}
      </div>
    </div>
  );
}
