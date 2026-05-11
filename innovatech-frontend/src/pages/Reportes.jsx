import React, { useEffect, useState } from 'react';
import { getReportes } from '../services/api';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/StateHelpers';

export default function Reportes() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getReportes()
      .then((d) => { setList(Array.isArray(d) ? d : []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={`Error al cargar reportes. ${error}`} />;

  return (
    <div className="section-fade">
      <div className="section-title">Reportes</div>
      <div className="section-sub">{list.length} reportes generados</div>

      <div className="data-card">
        <div className="data-card-header">
          <h5>
            <i className="bi bi-file-bar-graph me-2" style={{ color: 'var(--accent4)' }}></i>
            Historial de Reportes
          </h5>
        </div>

        {list.length ? (
          <table className="inovatech-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id || r.titulo}>
                  <td>
                    <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
                      #{r.id || '—'}
                    </span>
                  </td>
                  <td><b>{r.titulo || r.nombre || '—'}</b></td>
                  <td>
                    <span
                      style={{
                        fontSize: '12px',
                        background: 'rgba(255,196,77,0.1)',
                        color: 'var(--accent4)',
                        padding: '2px 9px',
                        borderRadius: '12px',
                      }}
                    >
                      {r.tipoReporte || r.tipo || '—'}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--muted)', fontSize: '12px' }}>
                      {r.fechaCreacion
                        ? new Date(r.fechaCreacion).toLocaleDateString('es-CL')
                        : '—'}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--muted)', fontSize: '13px' }}>
                      {r.descripcion || '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState message="No hay reportes registrados." />
        )}
      </div>
    </div>
  );
}
