import React, { useEffect, useState } from 'react';
import {
  getRecursos,
  createRecurso,
  updateRecurso,
  deleteRecurso,
} from '../services/api';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/StateHelpers';

const TIPOS = ['Hardware', 'Software', 'Humano', 'Cloud', 'Otro'];
const ESTADOS = ['Disponible', 'Asignado', 'Licencia'];
const emptyForm = {
  nombreRecurso: '',
  tipo: 'Humano',
  cantidad: 1,
  rol: '',
  estado: 'Disponible',
  email: '',
};

export default function Recursos() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    getRecursos()
      .then((d) => { setList(Array.isArray(d) ? d : []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  };

  useEffect(load, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setModal(true);
  };

  const openEdit = (r) => {
    setEditing(r);
    setForm({
      nombreRecurso: r.nombreRecurso || r.nombre || '',
      tipo: r.tipo || 'Humano',
      cantidad: r.cantidad || 1,
      rol: r.rol || '',
      estado: r.estado || 'Disponible',
      email: r.email || '',
    });
    setModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = { ...form, cantidad: parseInt(form.cantidad) || 1 };
      if (editing) await updateRecurso(editing.id, payload);
      else await createRecurso(payload);
      setModal(false);
      load();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este recurso?')) return;
    try { await deleteRecurso(id); load(); }
    catch (e) { alert('Error: ' + e.message); }
  };

  const filtered = list.filter((r) =>
    `${r.id} ${r.nombreRecurso || r.nombre} ${r.rol} ${r.tipo} ${r.estado}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const disp = list.filter((r) => r.estado === 'Disponible').length;
  const asig = list.filter((r) => r.estado === 'Asignado').length;
  const licencia = list.filter((r) => r.estado === 'Licencia').length;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={`Error al cargar recursos. ${error}`} />;

  return (
    <div className="section-fade">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <div className="section-title">Recursos Humanos</div>
          <div className="section-sub">
            {list.length} recursos · {disp} disponibles · {asig} asignados
          </div>
        </div>
        <button className="btn-inovatech" onClick={openNew}>
          <i className="bi bi-plus-lg"></i> Nuevo Recurso
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="kpi-card green">
            <div className="kpi-label">Disponibles</div>
            <div className="kpi-value">{disp}</div>
            <i className="bi bi-person-check-fill kpi-icon"></i>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-card blue">
            <div className="kpi-label">Asignados</div>
            <div className="kpi-value">{asig}</div>
            <i className="bi bi-person-fill-gear kpi-icon"></i>
          </div>
        </div>
        <div className="col-md-4">
          <div className="kpi-card red">
            <div className="kpi-label">En Licencia</div>
            <div className="kpi-value">{licencia}</div>
            <i className="bi bi-person-dash-fill kpi-icon"></i>
          </div>
        </div>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h5>
            <i className="bi bi-person-workspace me-2" style={{ color: 'var(--accent)' }}></i>
            Equipo de Recursos
          </h5>
          <div className="search-wrap">
            <i className="bi bi-search"></i>
            <input
              className="search-input"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length ? (
          <table className="inovatech-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td><span style={{ color: 'var(--muted)', fontSize: '12px' }}>#{r.id}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <div className="avatar" style={{ width: '28px', height: '28px', fontSize: '11px' }}>
                        {(r.nombreRecurso || r.nombre || '?').charAt(0)}
                      </div>
                      <b>{r.nombreRecurso || r.nombre || '—'}</b>
                    </div>
                  </td>
                  <td><span style={{ color: 'var(--muted)' }}>{r.rol || '—'}</span></td>
                  <td><span style={{ fontSize: '12px' }}>{r.tipo || '—'}</span></td>
                  <td><span style={{ color: 'var(--muted)' }}>{r.cantidad ?? '—'}</span></td>
                  <td><StatusBadge estado={r.estado} /></td>
                  <td>
                    <button className="btn-inovatech btn-sm me-1" onClick={() => openEdit(r)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn-danger-ghost" onClick={() => handleDelete(r.id)}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState message="No hay recursos registrados." />
        )}
      </div>

      <Modal
        isOpen={modal}
        title={editing ? 'Editar Recurso' : 'Nuevo Recurso'}
        onClose={() => setModal(false)}
        onConfirm={handleSave}
      >
        <div className="form-group">
          <label className="form-label-dark">Nombre del Recurso</label>
          <input
            className="form-control-dark"
            placeholder="Ej: Juan Pérez / Servidor AWS"
            value={form.nombreRecurso}
            onChange={(e) => setForm({ ...form, nombreRecurso: e.target.value })}
          />
        </div>
        <div className="row g-2">
          <div className="col-6 form-group">
            <label className="form-label-dark">Tipo</label>
            <select
              className="form-control-dark"
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            >
              {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="col-6 form-group">
            <label className="form-label-dark">Cantidad</label>
            <input
              className="form-control-dark"
              type="number"
              min="1"
              value={form.cantidad}
              onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
            />
          </div>
        </div>
        <div className="row g-2">
          <div className="col-6 form-group">
            <label className="form-label-dark">Rol</label>
            <input
              className="form-control-dark"
              placeholder="Developer, Designer..."
              value={form.rol}
              onChange={(e) => setForm({ ...form, rol: e.target.value })}
            />
          </div>
          <div className="col-6 form-group">
            <label className="form-label-dark">Estado</label>
            <select
              className="form-control-dark"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            >
              {ESTADOS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label-dark">Email</label>
          <input
            className="form-control-dark"
            placeholder="recurso@innovatech.cl"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
}
