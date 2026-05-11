import React from 'react';

const STATUS_CLASSES = {
  Activo: 'status-activo',
  Pausado: 'status-pausado',
  Completado: 'status-completado',
  'En Espera': 'status-pausado',
  Disponible: 'status-disponible',
  Asignado: 'status-asignado',
  Licencia: 'status-licencia',
};

export default function StatusBadge({ estado }) {
  if (!estado) {
    return (
      <span
        className="status-badge"
        style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--muted)' }}
      >
        —
      </span>
    );
  }
  const cls = STATUS_CLASSES[estado] || 'status-asignado';
  return <span className={`status-badge ${cls}`}>{estado}</span>;
}
