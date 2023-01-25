import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CustomerProducts from './pages/CostumerProducts';

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/costumer/products" element={ <CustomerProducts /> } />
    </Routes>
  );
}

export default RoutesApp;
