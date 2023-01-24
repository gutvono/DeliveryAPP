import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
    </Routes>
  );
}

export default RoutesApp;
