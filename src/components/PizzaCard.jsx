import React from 'react';

export default function PizzaCard({ pizza, onCustomize }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-orange-300 relative">
    
      <div className="absolute top-0 right-0 w-20 h-20 bg-orange-400 opacity-10 rounded-bl-full transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-3 h-36 flex items-center justify-center">
        <img
          src={pizza.pizza_image}
          alt={pizza.pizza_name}
          className="w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-700"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-md border border-orange-200">
          <span className="text-xs font-semibold text-orange-600">{pizza.category?.category_name}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {pizza.pizza_name}
        </h3>

        <div className="space-y-1.5 mb-3">
          {pizza.pizza_prices.map((p, idx) => (
            <div 
              key={p.shortcode} 
              className="flex justify-between items-center text-xs py-1 px-2 rounded-md bg-gray-50 hover:bg-orange-50 transition-colors"
            >
              <span className="text-gray-600 font-medium">{p.size}</span>
              <span className="font-bold text-gray-900">₹{Number(p.price).toFixed(0)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onCustomize(pizza)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm relative overflow-hidden group"
        >
          <span className="relative z-10">Customize</span>
          <div className="absolute inset-0 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </button>
      </div>

      <div className="absolute bottom-2 left-2 flex gap-1 opacity-20">
        <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
        <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
        <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
      </div>
    </div>
  );
}