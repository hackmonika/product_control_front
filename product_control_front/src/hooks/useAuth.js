import { useState } from 'react';
import login from '../components/Login';

export const useAuth = () => {
  const [token, setToken] = useState(() => {
  try {
    return localStorage.getItem("token") || null; // Retorna o token ou null
  } catch (error) {
    console.error("Erro ao acessar localStorage:", error);
    return null;
  }
});

  const loginUser = (email, password) => {
    return login(email, password).then((data) => {
      setToken(data.token);
      localStorage.setItem('token', data.token);
    });
  };

  const logoutUser = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return { token, loginUser, logoutUser };
};
