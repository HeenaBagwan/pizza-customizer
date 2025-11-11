import { useState, useEffect } from 'react';
import { fetchPizzas, fetchIngredients } from '../api/pizzaApi';

export const useFetchData = () => {
  const [pizzas, setPizzas] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pizzaData = await fetchPizzas();
        const ingredientData = await fetchIngredients();
        setPizzas(pizzaData?.data || []);
        setIngredients(ingredientData?.data || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { pizzas, ingredients, loading };
};
