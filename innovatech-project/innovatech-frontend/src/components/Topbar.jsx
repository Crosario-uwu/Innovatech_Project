import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const TITLES = {
  '/': 'Dashboard',
  '/proyectos': 'Proyectos',
  '/clientes': 'Clientes',
  '/recursos': 'Recursos Humanos',
  '/equipos': 'Equipos',
  '/kpis': 'KPIs & Analítica',
  '/reportes': 'Reportes',
};

export default function Topbar() {
  const { apiOnline } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const title = TITLES[location.pathname] || 'Innovatech';

  const handleRefresh = () => {
    // Force re-render of current page by navigating to same route
    navigate(0);
  };

  return (
    <header className="topbar">
      <h1>{title}</h1>
      <div className="topbar-right">
        <span className={`badge-api${apiOnline ? '' : ' offline'}`}>
          <i className="bi bi-circle-fill" style={{ fontSize: '7px' }}></i>
          BFF :8080 {apiOnline ? 'OK' : 'ERR'}
        </span>
        <button className="btn-ghost" onClick={handleRefresh}>
          <i className="bi bi-arrow-clockwise"></i> Actualizar
        </button>
      </div>
    </header>
  );
}
