import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado para erros
  const [editingProduct, setEditingProduct] = useState(null); // Produto sendo editado

  // Função para buscar os produtos
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      setError('Erro ao carregar os produtos');
      setIsLoading(false);
    }
  };

  // useEffect para buscar os produtos ao carregar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para criar ou editar um produto
  const saveProduct = async (product) => {
  try {
    const formData = new FormData();
      formData.append("product[name]", product.name);
      formData.append("product[price]", product.price);
      formData.append("product[stock_quantity]", product.stock_quantity);
      formData.append("product[description]", product.description);
      if (product.image) {
        formData.append("product[image]", product.image);
      }

      if (product.id) {
        // Atualizar produto
        const response = await axios.put(
          `http://localhost:3000/products/${product.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProducts(products.map((p) => (p.id === product.id ? response.data : p)));
      } else {
        // Criar novo produto
        const response = await axios.post(
          "http://localhost:3000/products",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      fetchProducts()

      setEditingProduct(null); // Fechar o formulário
      setFormErrors({}); // Limpar erros
    } catch (err) {
      if (err.response && err.response.data) {
        setFormErrors(err.response.data); // Erros do backend
      } else {
        alert("Erro inesperado ao salvar o produto.");
      }
    }
  };

  // Função para excluir um produto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      alert('Erro ao excluir o produto');
    }
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) {
    return (
      <div className="flex flex-row justify-center items-center h-screen">
        Sem produtos
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 h-fit">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Produtos</h1>

      {/* Botão para abrir o formulário de criação */}
      {!editingProduct && (
        <button
          className="mb-6 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() =>
            setEditingProduct({ name: '', price: '', stock_quantity: '', description: '' })
          }
        >
          Criar Produto
        </button>
      )}

      {/* Formulário de criação ou edição */}
      {editingProduct && (
        <form
          className="mb-6 p-4 bg-white shadow-md rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            saveProduct(editingProduct);
          }}
        >
          <h2 className="text-2xl font-bold mb-4">
            {editingProduct.id ? 'Editar Produto' : 'Criar Produto'}
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nome"
              className={`block w-full p-2 border ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              required
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Imagem do Produto</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full p-2 border border-gray-300"
              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.files[0] })}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Preço"
              className={`block w-full p-2 border ${
                formErrors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              required
            />
            {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Quantidade em Estoque"
              className={`block w-full p-2 border ${
                formErrors.stock_quantity ? 'border-red-500' : 'border-gray-300'
              }`}
              value={editingProduct.stock_quantity}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock_quantity: e.target.value })
              }
              required
            />
            {formErrors.stock_quantity && (
              <p className="text-red-500 text-sm">{formErrors.stock_quantity}</p>
            )}
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Descrição"
              className={`block w-full p-2 border ${
                formErrors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
              required
            ></textarea>
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
          </div>
           <div className="flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-full mr-2"
              type="submit"
            >
              Salvar
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded w-full ml-2"
              onClick={() => setEditingProduct(null)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Lista de produtos em cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border p-4"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <div className="mb-4">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-32 object-cover mb-2" />
              ) : (
                <p className="text-gray-500">Sem imagem</p>
              )}
            </div>
            <p className="text-gray-600 mt-2">Preço: R$ {parseFloat(product.price).toFixed(2)}</p>
            <p className="text-gray-500">Estoque: {product.stock_quantity}</p>
            <p className="text-gray-500">Descrição: {product.description}</p>
            <div className="mt-4">
              <button
                className="bg-yellow-500 text-white py-1 px-4 rounded mr-2 hover:bg-yellow-600"
                onClick={() => setEditingProduct(product)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                onClick={() => deleteProduct(product.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
