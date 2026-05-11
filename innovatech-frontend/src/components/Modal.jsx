import React from 'react';

export default function Modal({ isOpen, title, onClose, onConfirm, children }) {
  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? 'open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <div className="modal-title">{title}</div>
        <div>{children}</div>
        <div className="modal-actions">
          <button className="btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-inovatech" onClick={onConfirm}>
            Guardar
          </button>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; pointer-events: none; transition: opacity 0.2s;
        }
        .modal-overlay.open { opacity: 1; pointer-events: all; }
        .modal-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 28px;
          width: 100%; max-width: 480px;
          transform: scale(0.96); transition: transform 0.2s;
        }
        .modal-overlay.open .modal-box { transform: scale(1); }
        .modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.1rem; font-weight: 700; margin-bottom: 20px;
        }
        .modal-actions {
          display: flex; gap: 10px;
          justify-content: flex-end; margin-top: 22px;
        }
      `}</style>
    </div>
  );
}
