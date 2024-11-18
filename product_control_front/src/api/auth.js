import api from './axios';

export const login = async (email, password) => {
  const response = await api.post('/api/login', { email, password });
  const { token, user } = response.data;

  localStorage.setItem("jwt_token", token);
  return user;
};
