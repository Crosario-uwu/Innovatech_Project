import React, { useEffect, useState } from 'react';
import {
  getProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} from '../services/api';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/StateHelpers';

const ESTADOS = ['Activo', 'Pausado', 'Completado', 'En Espera'];

const emptyForm = { nombre: '', estado: 'Activo' };

export default function Proyectos() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    getProyectos()
      .then((d) => { setList(Array.isArray(d) ? d : []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  };

  useEffect(load, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ nombre: p.nombre, estado: p.estado });
    setModal(true);
  };

  const handleSave = async () => {
    try {
      if (editing) await updateProyecto(editing.id, form);
      else await createProyecto(form);
      setModal(false);
      load();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto?')) return;
    try { await deleteProyecto(id); load(); }
    catch (e) { alert('Error: ' + e.message); }
  };

  const filtered = list.filter((p) =>
    `${p.id} ${p.nombre} ${p.estado}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={`Error al cargar proyectos. ${error}`} />;

  return (
    <div className="section-fade">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <div className="section-title">Proyectos</div>
          <div className="section-sub">{list.length} proyectos en el sistema</div>
        </div>
        <button className="btn-inovatech" onClick={openNew}>
          <i className="bi bi-plus-lg"></i> Nuevo Proyecto
        </button>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h5>
            <i className="bi bi-kanban me-2" style={{ color: 'var(--accent)' }}></i>
            Lista de Proyectos
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td><span style={{ color: 'var(--muted)', fontSize: '12px' }}>#{p.id}</span></td>
                  <td><b>{p.nombre}</b></td>
                  <td><StatusBadge estado={p.estado} /></td>
                  <td>
                    <button className="btn-inovatech btn-sm me-1" onClick={() => openEdit(p)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn-danger-ghost" onClick={() => handleDelete(p.id)}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState message="No hay proyectos registrados. Crea el primero." />
        )}
      </div>

      <Modal
        isOpen={modal}
        title={editing ? 'Editar Proyecto' : 'Nuevo Proyecto'}
        onClose={() => setModal(false)}
        onConfirm={handleSave}
      >
        <div className="form-group">
          <label className="form-label-dark">Nombre del Proyecto</label>
          <input
            className="form-control-dark"
            placeholder="Ej: Plataforma E-commerce"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label-dark">Estado</label>
          <select
            className="form-control-dark"
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value })}
          >
            {ESTADOS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </Modal>
    </div>
  );
}
