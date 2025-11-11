import React, { useState } from 'react';
import { useFetchData } from './hooks/useFetchData';
import PizzaList from './components/PizzaList';
import CustomizeModal from './components/CustomizeModal';
import Loading from './components/Loading';

export default function App() {
  const { pizzas, ingredients, loading } = useFetchData();
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCustomize = (pizza) => {
    setSelectedPizza(pizza);
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <PizzaList pizzas={pizzas} onCustomize={handleCustomize} />
      {modalOpen && (
        <CustomizeModal
          open={modalOpen}
          onClose={handleCloseModal}
          pizza={selectedPizza}
          ingredients={ingredients}
        />
      )}
    </div>
  );
}
