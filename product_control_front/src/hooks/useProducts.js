import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/products';

export const useProducts = () => {
  const queryClient = useQueryClient();

  const { data: products, isLoading, isError,  ...query } = useQuery({queryKey: ['products'], queryFn: fetchProducts});

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }) => updateProduct(id, product), // Agora especificado como mutationFn
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Use o novo formato de queryKey
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct, // mutationFn especificado
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }); // Formato de queryKey
    },
  });

  return { products, query, createMutation, updateMutation, deleteMutation };
};
