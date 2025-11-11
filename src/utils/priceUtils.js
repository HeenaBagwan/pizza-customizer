export const toNumber = (val) => {
  const num = parseFloat(val);
  return isNaN(num) ? 0 : num;
};

export const calculateTotal = ({ basePrice, crustPrice, specialBasePrice, toppings }) => {
  let total = toNumber(basePrice) + toNumber(crustPrice) + toNumber(specialBasePrice);
  toppings.forEach(t => {
    const count = toNumber(t.count) || 1;
    total += toNumber(t.price) * count;
  });
  return total;
};
