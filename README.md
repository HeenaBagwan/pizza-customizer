# React Pizza Customizer

## Description
A **responsive React.js application** to list pizzas and allow customization with toppings, crusts, and special bases. **Live price updates** as ingredients are selected.

## Features
- Fetch pizzas & ingredients dynamically from APIs  
- Responsive grid layout using **Tailwind CSS**  
- Customize pizza in a **modal** with live total price calculation  
- **Confirm selection** logs the final order as a JSON in the console  
- Mobile-friendly and professional UI design  

## Libraries Used
- React 18  
- Axios  
- Tailwind CSS  

## Steps to Run
1. Clone the repository  
2. Run `npm install`  
3. Run `npm start`  
4. Open [http://localhost:3000](http://localhost:3000) in your browser  

## Assumptions
- APIs may return fewer pizzas; the grid adapts automatically  
- Prices are **exact as per API**  
- Confirmation logs the order in the console; it does **not save to backend**  

## Sample Order JSON
```json
{
  "pizza": "Cheese Pizza",
  "size": "Medium",
  "crust": "Pan",
  "specialBase": "Garlic (base)",
  "toppings": ["Cheese", "Peri Peri Paneer"],
  "totalPrice": 20.50
}
