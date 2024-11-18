import axios from "axios";

// Configuração básica do Axios
const instance = axios.create({
  baseURL: "http://localhost:3000", // Base URL da sua API
});

// Adicionar o token JWT a todas as requisições
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
