import React, { useEffect, useState } from 'react';
import { getKpis } from '../services/api';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/StateHelpers';

const COLORS = ['blue', 'green', 'yellow', 'red'];

export default function Kpis() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getKpis()
      .then((d) => { setList(Array.isArray(d) ? d : []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={`Error al cargar KPIs. ${error}`} />;

  return (
    <div className="section-fade">
      <div className="section-title">KPIs & Analítica</div>
      <div className="section-sub">{list.length} indicadores clave de desempeño</div>

      {list.length ? (
        <>
          <div className="row g-3 mb-4">
            {list.map((k, i) => {
              const val = k.valorKpi != null ? k.valorKpi.toFixed(1) : '—';
              const pct = k.valorKpi != null && k.valorKpi <= 100 ? k.valorKpi : null;
              return (
                <div className="col-md-3" key={k.id || i}>
                  <div className={`kpi-card ${COLORS[i % 4]}`}>
                    <div className="kpi-label">{k.nombreKpi || k.nombre || 'KPI'}</div>
                    <div className="kpi-value">{val}</div>
                    <div className="kpi-sub">
                      {k.fechaCreacion
                        ? new Date(k.fechaCreacion).toLocaleDateString('es-CL')
                        : ''}
                    </div>
                    <i className="bi bi-graph-up-arrow kpi-icon"></i>
                    {pct !== null && (
                      <div className="progress-bar-custom">
                        <div
                          className="progress-fill"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="data-card">
            <div className="data-card-header">
              <h5>
                <i className="bi bi-table me-2" style={{ color: 'var(--accent)' }}></i>
                Detalle de KPIs
              </h5>
            </div>
            <table className="inovatech-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre KPI</th>
                  <th>Valor</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {list.map((k) => (
                  <tr key={k.id || k.nombreKpi}>
                    <td>
                      <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
                        #{k.id || '—'}
                      </span>
                    </td>
                    <td><b>{k.nombreKpi || k.nombre || '—'}</b></td>
                    <td>
                      <span
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 700,
                          color: 'var(--accent2)',
                        }}
                      >
                        {k.valorKpi != null ? k.valorKpi.toFixed(2) : '—'}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
                        {k.fechaCreacion
                          ? new Date(k.fechaCreacion).toLocaleString('es-CL')
                          : '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <EmptyState message="No hay KPIs registrados." />
      )}
    </div>
  );
}
