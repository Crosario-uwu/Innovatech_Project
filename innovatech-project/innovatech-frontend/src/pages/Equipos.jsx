import React, { useEffect, useState } from 'react';

import { getRecursos } from '../services/api';

import StatusBadge from '../components/StatusBadge';

import {
  LoadingSpinner,
  ErrorState,
  EmptyState
} from '../components/StateHelpers';

const ROLES = [
  'Developer',
  'Designer',
  'Manager',
  'DevOps',
  'QA',
  'Consultor'
];

export default function Equipos() {

  const [recursos, setRecursos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // ======================================
  // CARGAR RECURSOS
  // ======================================

  useEffect(() => {

    getRecursos()

      .then((data) => {

        console.log(data);

        setRecursos(
          Array.isArray(data) ? data : []
        );

        setLoading(false);

      })

      .catch((e) => {

        console.error(e);

        setError(e.message);

        setLoading(false);

      });

  }, []);

  // ======================================
  // AGRUPAR POR ROL
  // ======================================

  const gruposPorRol = ROLES.map((rol) => ({

    rol,

    miembros: recursos.filter(
      (r) => r.rol === rol
    ),

  })).filter(
    (grupo) => grupo.miembros.length > 0
  );

  // ======================================
  // ESTADOS
  // ======================================

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <ErrorState
        message={`Error al cargar equipos. ${error}`}
      />
    );
  }

  // ======================================
  // RENDER
  // ======================================

  return (

    <div className="section-fade">

      {/* TITULO */}

      <div className="section-title">
        Equipos
      </div>

      <div className="section-sub">
        Distribución de recursos por rol
      </div>

      {/* CARD */}

      <div className="data-card">

        <div className="data-card-header">

          <h5>

            <i
              className="bi bi-diagram-3 me-2"
              style={{
                color: 'var(--accent2)'
              }}
            ></i>

            Vista de Capacidad

          </h5>

        </div>

        {gruposPorRol.length ? (

          <div style={{ padding: '16px' }}>

            <div className="row g-3">

              {gruposPorRol.map((grupo) => (

                <div
                  className="col-md-4"
                  key={grupo.rol}
                >

                  <div
                    style={{
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '18px',
                    }}
                  >

                    {/* HEADER */}

                    <div
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >

                      {grupo.rol}

                      <span
                        style={{
                          fontSize: '11px',
                          background:
                            'rgba(79,140,255,0.1)',
                          color: 'var(--accent)',
                          padding: '2px 8px',
                          borderRadius: '10px',
                        }}
                      >
                        {grupo.miembros.length}
                      </span>

                    </div>

                    {/* INTEGRANTES */}

                    {grupo.miembros.map((r) => (

                      <div
                        key={r.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '7px 0',
                          borderBottom:
                            '1px solid var(--border)',
                        }}
                      >

                        {/* AVATAR */}

                        <div
                          className="avatar"
                          style={{
                            width: '26px',
                            height: '26px',
                            fontSize: '10px'
                          }}
                        >
                          {(r.nombreRecurso || '?')
                            .charAt(0)}
                        </div>

                        {/* NOMBRE */}

                        <span
                          style={{
                            fontSize: '13px'
                          }}
                        >
                          {r.nombreRecurso}
                        </span>

                        {/* ESTADO */}

                        <div
                          style={{
                            marginLeft: 'auto'
                          }}
                        >
                          <StatusBadge
                            estado={r.estado}
                          />
                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              ))}

            </div>

          </div>

        ) : (

          <EmptyState
            message="No existen recursos con roles asignados."
          />

        )}

      </div>

    </div>

  );
}