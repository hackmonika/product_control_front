import { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData = {}, buttonLabel }) => {
  const [name, setName] = useState(initialData.name || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [stockQuantity, setStockQuantity] = useState(initialData.stock_quantity || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, price: parseFloat(price), stock_quantity: parseInt(stockQuantity, 10), description });
  };

  return (
    <form className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">{buttonLabel}</h2>
      <input
        type="text"
        placeholder="Nome"
        className="block w-full p-2 border mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        className="block w-full p-2 border mb-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        step="0.01"
        required
      />
      <input
        type="number"
        placeholder="Quantidade em Estoque"
        className="block w-full p-2 border mb-2"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição"
        className="block w-full p-2 border mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        {buttonLabel}
      </button>
    </form>
  );
};

export default ProductForm;
