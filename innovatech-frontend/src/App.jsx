import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        {/* Sidebar fijo a la izquierda */}
        <Sidebar />

        {/* Contenido principal desplazado 240px */}
        <div id="main">
          <Topbar />
          <div className="content-area">
            <AppRoutes />
          </div>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
