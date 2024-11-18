const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mt-2">Preço: R$ {product.price.toFixed(2)}</p>
      <p className="text-gray-500">Estoque: {product.stock_quantity}</p>
      <div className="mt-4">
        <button
          className="bg-yellow-500 text-white py-1 px-4 rounded mr-2 hover:bg-yellow-600"
          onClick={() => onEdit(product)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
          onClick={() => onDelete(product.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
