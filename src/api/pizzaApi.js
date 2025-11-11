import axios from 'axios';

const base = 'https://pizzaadmin.neosao.co.in/api/v1/mas/vx';
const SIGN = 'akjsh3h28jais1poqpamvg1';

export const fetchPizzas = () =>
  axios.get(`${base}/pizzas?sign_key=${SIGN}`).then(res => res.data);

export const fetchIngredients = () =>
  axios.get(`${base}/ingredients?sign_key=${SIGN}`).then(res => res.data);
