import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
 
// Muestra Login si no hay sesión, de lo contrario renderiza los hijos
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Login />;
  return children;
}
 