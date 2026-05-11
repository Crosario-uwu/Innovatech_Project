import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Proyectos from '../pages/Proyectos';
import Clientes from '../pages/Clientes';
import Recursos from '../pages/Recursos';
import Equipos from '../pages/Equipos';
import Kpis from '../pages/Kpis';
import Reportes from '../pages/Reportes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/proyectos" element={<Proyectos />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/recursos" element={<Recursos />} />
      <Route path="/equipos" element={<Equipos />} />
      <Route path="/kpis" element={<Kpis />} />
      <Route path="/reportes" element={<Reportes />} />
    </Routes>
  );
}
