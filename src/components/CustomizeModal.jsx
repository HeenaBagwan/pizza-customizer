import React, { useEffect, useMemo, useState } from "react";
import { calculateTotal } from "../utils/priceUtils";

const toNumber = (val) => parseFloat(val) || 0;

export default function CustomizeModal({ open, onClose, pizza, ingredients }) {
  const [size, setSize] = useState(null);
  const [crust, setCrust] = useState(null);
  const [specialBase, setSpecialBase] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    if (!pizza) return;

    const defaultPrice =
      pizza.pizza_prices.find((p) => p.isDefault) ??
      pizza.pizza_prices[1] ??
      pizza.pizza_prices[0];

    setSize(defaultPrice?.shortcode ?? pizza.pizza_prices[0].shortcode);
    setCrust(null);
    setSpecialBase(null);
    setSelectedToppings([]);
  }, [pizza]);

  if (!open || !pizza) return null;

  const sizeObj = useMemo(
    () =>
      pizza.pizza_prices.find((p) => p.shortcode === size) ?? pizza.pizza_prices[0],
    [pizza, size]
  );

  const crustList = ingredients?.crust ?? [];
  const specialBases = ingredients?.specialbases ?? [];
  const toppings = ingredients?.toppings ?? { countAsOne: [], countAsTwo: [] };

  function toggleTopping(t) {
    const exists = selectedToppings.find(
      (x) => x.toppingsName === t.toppingsName
    );
    if (exists) {
      setSelectedToppings((prev) =>
        prev.filter((x) => x.toppingsName !== t.toppingsName)
      );
    } else {
      setSelectedToppings((prev) => [
        ...prev,
        { ...t, count: parseInt(t.countAs) }, 
      ]);
    }
  }

  const total = useMemo(() => {
    return calculateTotal({
      basePrice: sizeObj?.price,
      crustPrice: crust?.price,
      specialBasePrice: specialBase?.price,
      toppings: selectedToppings,
    });
  }, [sizeObj, crust, specialBase, selectedToppings]);

  function confirm() {
    if (!sizeObj || !crust || !specialBase) {
      alert("Please select Size, Crust, and Special Base.");
      return;
    }

    const result = {
      pizza: pizza.pizza_name,
      size: sizeObj.size,
      crust: crust?.crustName ?? null,
      specialBase: specialBase?.specialbaseName ?? null,
      toppings: selectedToppings.map((t) => t.toppingsName),
      totalPrice: Number(total),
    };

    console.log("Final pizza configuration:", JSON.stringify(result, null, 2));
    alert("Order confirmed! Check console for details.");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col relative border-4 border-orange-200">
        {/* Header */}
        <div className="relative bg-white border-b-4 border-orange-400 p-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 opacity-10 transform rotate-45 translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 opacity-10 transform rotate-45 -translate-x-12 translate-y-12"></div>
          <div className="flex justify-between items-center relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                <h2 className="text-3xl font-black text-gray-900">Build Your Pizza</h2>
              </div>
              <p className="text-orange-600 font-semibold ml-5">{pizza.pizza_name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2.5 transition-all hover:rotate-90 duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="space-y-5">
              {/* Price of all Size */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <label className="text-sm font-bold text-gray-800">Choose Size <span className="text-orange-500">*</span></label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {pizza.pizza_prices.map((p) => (
                    <button
                      key={p.shortcode}
                      onClick={() => setSize(p.shortcode)}
                      className={`relative py-3 px-3 rounded-xl font-semibold text-sm transition-all transform hover:scale-105 ${
                        size === p.shortcode
                          ? "bg-orange-500 text-white shadow-lg border-2 border-orange-600"
                          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <div className="font-bold">{p.size}</div>
                      <div className="text-xs mt-0.5">₹{toNumber(p.price).toFixed(2)}</div>
                      {size === p.shortcode && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Crust */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                  </div>
                  <label className="text-sm font-bold text-gray-800">Select Crust <span className="text-orange-500">*</span></label>
                </div>
                <select
                  value={crust?.crustCode ?? ""}
                  onChange={(e) => setCrust(crustList.find(c => c.crustCode === e.target.value) || null)}
                  className={`w-full p-3 border-2 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all ${
                    !crust ? "border-orange-300 bg-orange-50" : "border-gray-200"
                  }`}
                >
                  <option value="">-- Pick your crust --</option>
                  {crustList.map((c) => (
                    <option key={c.crustCode} value={c.crustCode}>
                      {c.crustName} (+₹{toNumber(c.price).toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Base */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                  </div>
                  <label className="text-sm font-bold text-gray-800">Special Base <span className="text-orange-500">*</span></label>
                </div>
                <select
                  value={specialBase?.specialbaseCode ?? ""}
                  onChange={(e) => setSpecialBase(specialBases.find(s => s.specialbaseCode === e.target.value) || null)}
                  className={`w-full p-3 border-2 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none transition-all ${
                    !specialBase ? "border-orange-300 bg-orange-50" : "border-gray-200"
                  }`}
                >
                  <option value="">-- Pick your base --</option>
                  {specialBases.map((s) => (
                    <option key={s.specialbaseCode} value={s.specialbaseCode}>
                      {s.specialbaseName} (+₹{toNumber(s.price).toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Toppings */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <label className="text-sm font-bold text-gray-800">Add Toppings <span className="text-gray-500 text-xs font-normal">(optional)</span></label>
              </div>

              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                {/* CountAsOne */}
                {toppings.countAsOne.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Standard</h4>
                    {toppings.countAsOne.map((t) => {
                      const checked = !!selectedToppings.find(x => x.toppingsName === t.toppingsName);
                      return (
                        <label key={t.toppingsName} className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md my-2 ${checked ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checked ? "bg-orange-500 border-orange-500" : "border-gray-300"}`}>
                            {checked && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                          </div>
                          <input type="checkbox" checked={checked} onChange={() => toggleTopping(t)} className="hidden" />
                          <div className="flex-1 text-sm"><div className="font-semibold text-gray-800">{t.toppingsName}</div></div>
                          <div className="text-sm font-bold text-orange-600">+₹{toNumber(t.price).toFixed(2)}</div>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* CountAsTwo */}
                {toppings.countAsTwo.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">Premium</h4>
                    {toppings.countAsTwo.map((t) => {
                      const checked = !!selectedToppings.find(x => x.toppingsName === t.toppingsName);
                      return (
                        <label key={t.toppingsName} className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md my-2 ${checked ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-red-200"}`}>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checked ? "bg-red-500 border-red-500" : "border-gray-300"}`}>
                            {checked && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                          </div>
                          <input type="checkbox" checked={checked} onChange={() => toggleTopping(t)} className="hidden" />
                          <div className="flex-1 text-sm"><div className="font-semibold text-gray-800">{t.toppingsName}</div></div>
                          <div className="text-sm font-bold text-red-600">+₹{(toNumber(t.price) * 2).toFixed(2)}</div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer to show the total price */}
        <div className="relative bg-white border-t-4 border-orange-400 p-5 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-400 opacity-10 transform rotate-45 translate-x-12 -translate-y-12"></div>
          <div className="flex justify-between items-center relative z-10">
            <div className="text-xl font-bold text-gray-800">Total: ₹{total.toFixed(2)}</div>
            <button onClick={confirm} className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-orange-600 transition-all">
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
