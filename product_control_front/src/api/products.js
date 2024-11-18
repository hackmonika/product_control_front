import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('/products');
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post('/products', product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`/products/${id}`, JSON.stringify(product));
  if (!response.ok) {
    throw new Error('Erro ao atualizar o produto');
  }
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`/products/${id}`);
  if (!response.ok) {
    throw new Error('Erro ao excluir o produto');
  }
  return response.json();
};
