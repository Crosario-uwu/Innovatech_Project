import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import { LoadingSpinner, ErrorState } from '../components/StateHelpers';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDashboard()
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={`No se pudo conectar al BFF. ${error}`} />;

  const res = data?.resumen || {};
  const proyectos = Array.isArray(data?.proyectos) ? data.proyectos : [];
  const recursos = Array.isArray(data?.recursosDisponibles) ? data.recursosDisponibles : [];

  const totalP = res.totalProyectos ?? proyectos.length;
  const completados = res.proyectosCompletados ?? proyectos.filter((p) => p.estado === 'Completado').length;
  const enEspera = res.proyectosEnEspera ?? proyectos.filter((p) => p.estado === 'Pausado').length;
  const presupuesto = res.presupuestoTotal ? `$${(res.presupuestoTotal / 1000000).toFixed(1)}M` : '—';
  const pct = totalP ? Math.round((completados / totalP) * 100) : 0;

  const recentProyectos = proyectos.slice(0, 5);
  const dispRecursos = recursos.filter((r) => r.estado === 'Disponible').slice(0, 4);

  return (
    <div className="section-fade">
      <div className="section-title">Resumen General</div>
      <div className="section-sub">Vista consolidada de Innovatech Solutions</div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="kpi-card blue">
            <div className="kpi-label">Total Proyectos</div>
            <div className="kpi-value">{totalP}</div>
            <div className="kpi-sub">{pct}% completados</div>
            <i className="bi bi-kanban-fill kpi-icon"></i>
            <div className="progress-bar-custom">
              <div className="progress-fill" style={{ width: `${pct}%` }}></div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-card green">
            <div className="kpi-label">Completados</div>
            <div className="kpi-value">{completados}</div>
            <div className="kpi-sub">proyectos finalizados</div>
            <i className="bi bi-check-circle-fill kpi-icon"></i>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-card yellow">
            <div className="kpi-label">En Espera</div>
            <div className="kpi-value">{enEspera}</div>
            <div className="kpi-sub">pausados o pendientes</div>
            <i className="bi bi-pause-circle-fill kpi-icon"></i>
          </div>
        </div>
        <div className="col-md-3">
          <div className="kpi-card red">
            <div className="kpi-label">Presupuesto</div>
            <div className="kpi-value">{presupuesto}</div>
            <div className="kpi-sub">total gestionado</div>
            <i className="bi bi-currency-dollar kpi-icon"></i>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="row g-3">
        <div className="col-md-7">
          <div className="data-card">
            <div className="data-card-header">
              <h5>
                <i className="bi bi-kanban me-2" style={{ color: 'var(--accent)' }}></i>
                Proyectos Recientes
              </h5>
              <button className="btn-inovatech btn-sm" onClick={() => navigate('/proyectos')}>
                Ver todos
              </button>
            </div>
            {recentProyectos.length ? (
              <table className="inovatech-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProyectos.map((p) => (
                    <tr key={p.id}>
                      <td><span style={{ color: 'var(--muted)', fontSize: '12px' }}>#{p.id}</span></td>
                      <td><b>{p.nombre}</b></td>
                      <td><StatusBadge estado={p.estado} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <p>No hay proyectos registrados</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-5">
          <div className="data-card h-100">
            <div className="data-card-header">
              <h5>
                <i className="bi bi-person-check me-2" style={{ color: 'var(--accent2)' }}></i>
                Recursos Disponibles
              </h5>
              <button className="btn-inovatech btn-sm" onClick={() => navigate('/recursos')}>
                Ver todos
              </button>
            </div>
            {dispRecursos.length ? (
              <div style={{ padding: '8px 0' }}>
                {dispRecursos.map((r, i) => (
                  <div
                    key={r.id || i}
                    style={{
                      padding: '12px 18px',
                      borderBottom: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '11px' }}>
                      {(r.nombreRecurso || r.nombre || '?').charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>
                        {r.nombreRecurso || r.nombre || '—'}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                        {r.rol || r.tipo || '—'}
                      </div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <StatusBadge estado={r.estado} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <p>No hay recursos disponibles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
