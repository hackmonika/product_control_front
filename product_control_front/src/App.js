import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

// import { AuthProvider } from './hooks/AuthContext';

const App = () => {
  return (
    // TODO: verificar pq o authprovider nao esta funcionando com sucesso
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            {/* <Route path="/signUp" element={<SignUpPage />} /> */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/products" element={<ProductsPage />} />
            TODO: adicionar roda para signup e page SignUpPage
          {/* </Routes>
        </div> */}
      </Router>
  )
};

export default App;
