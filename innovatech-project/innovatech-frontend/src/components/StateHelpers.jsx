import React from 'react';

export function LoadingSpinner() {
  return (
    <div>
      <div className="spinner-ring"></div>
      <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
        Cargando datos...
      </p>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="alert-dark">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {message}
      <br />
      <small style={{ opacity: 0.7 }}>
        Verifica que el backend esté corriendo en localhost:8080
      </small>
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <i className="bi bi-inbox"></i>
      <p>{message}</p>
    </div>
  );
}
