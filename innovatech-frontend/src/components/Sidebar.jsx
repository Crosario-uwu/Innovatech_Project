import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { section: 'Principal', links: [{ to: '/', label: 'Dashboard', icon: 'bi-grid-1x2-fill', end: true }] },
  {
    section: 'Gestión',
    links: [
      { to: '/proyectos', label: 'Proyectos', icon: 'bi-kanban-fill' },
      { to: '/clientes', label: 'Clientes', icon: 'bi-people-fill' },
      { to: '/recursos', label: 'Recursos', icon: 'bi-person-workspace' },
      { to: '/equipos', label: 'Equipos', icon: 'bi-diagram-3-fill' },
    ],
  },
  {
    section: 'Analítica',
    links: [
      { to: '/kpis', label: 'KPIs', icon: 'bi-graph-up-arrow' },
      { to: '/reportes', label: 'Reportes', icon: 'bi-file-bar-graph-fill' },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside id="sidebar">
      <div className="sidebar-logo">
        <span className="brand">
          Innovatech<span className="dot">.</span>
        </span>
        <small>Solutions Platform</small>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((group) => (
          <div key={group.section}>
            <div className="nav-section-label">{group.section}</div>
            {group.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `nav-item-btn${isActive ? ' active' : ''}`
                }
                style={{ textDecoration: 'none' }}
              >
                <i className={`bi ${link.icon}`}></i>
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="avatar">IS</div>
          <div className="user-info">
            <b>Admin</b>
            <small>Innovatech Solutions</small>
          </div>
        </div>
      </div>
    </aside>
  );
}
