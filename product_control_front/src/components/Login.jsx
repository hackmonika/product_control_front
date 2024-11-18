import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: VERIFICAR O RETORNO DO TOKEN E SALVAR
      await loginUser(email, password);
      alert('Login bem-sucedido!');
    } catch (error) {
      console.log(error);
      alert('Erro no login');
    }
  };

  return (
    <form className="max-w-md mx-auto mt-20" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="block w-full p-2 border mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block w-full p-2 border mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
