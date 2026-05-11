import React, { useEffect, useState } from 'react';
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../services/api';
import Modal from '../components/Modal';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/StateHelpers';

const SECTORES = ['Retail', 'Finanzas', 'Salud', 'Educación', 'Gobierno', 'Tecnología', 'Otro'];
const emptyForm = { nombre: '', contacto: '', sector: 'Retail' };

export default function Clientes() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    getClientes()
      .then((d) => { setList(Array.isArray(d) ? d : []); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  };

  useEffect(load, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setModal(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({ nombre: c.nombre, contacto: c.contacto || '', sector: c.sector || 'Retail' });
    setModal(true);
  };

  const handleSave = async () => {
    try {
      if (editing) await updateCliente(editing.id, form);
      else await createCliente(form);
      setModal(false);
      load();
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este cliente?')) return;
    try { await deleteCliente(id); load(); }
    catch (e) { alert('Error: ' + e.message); }
  };

  const filtered = list.filter((c) =>
    `${c.id} ${c.nombre} ${c.contacto} ${c.sector}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={`Error al cargar clientes. ${error}`} />;

  return (
    <div className="section-fade">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <div className="section-title">Clientes</div>
          <div className="section-sub">{list.length} clientes registrados</div>
        </div>
        <button className="btn-inovatech" onClick={openNew}>
          <i className="bi bi-plus-lg"></i> Nuevo Cliente
        </button>
      </div>

      <div className="data-card">
        <div className="data-card-header">
          <h5>
            <i className="bi bi-people me-2" style={{ color: 'var(--accent2)' }}></i>
            Lista de Clientes
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
                <th>Contacto</th>
                <th>Sector</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td><span style={{ color: 'var(--muted)', fontSize: '12px' }}>#{c.id}</span></td>
                  <td><b>{c.nombre}</b></td>
                  <td><span style={{ color: 'var(--muted)' }}>{c.contacto || '—'}</span></td>
                  <td>
                    <span style={{
                      fontSize: '12px',
                      background: 'rgba(79,140,255,0.1)',
                      color: 'var(--accent)',
                      padding: '2px 9px',
                      borderRadius: '12px',
                    }}>
                      {c.sector || '—'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-inovatech btn-sm me-1" onClick={() => openEdit(c)}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn-danger-ghost" onClick={() => handleDelete(c.id)}>
                      <i className="bi bi-trash3-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EmptyState message="No hay clientes registrados." />
        )}
      </div>

      <Modal
        isOpen={modal}
        title={editing ? 'Editar Cliente' : 'Nuevo Cliente'}
        onClose={() => setModal(false)}
        onConfirm={handleSave}
      >
        <div className="form-group">
          <label className="form-label-dark">Nombre</label>
          <input
            className="form-control-dark"
            placeholder="Ej: Banco Nacional"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label-dark">Contacto (email o teléfono)</label>
          <input
            className="form-control-dark"
            placeholder="contacto@empresa.cl"
            value={form.contacto}
            onChange={(e) => setForm({ ...form, contacto: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label className="form-label-dark">Sector</label>
          <select
            className="form-control-dark"
            value={form.sector}
            onChange={(e) => setForm({ ...form, sector: e.target.value })}
          >
            {SECTORES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </Modal>
    </div>
  );
}
