// ===============================================
// API.JS - FRONTEND REACT
// Conecta con el BFF (Backend For Frontend)
// Puerto BFF: 8080
// ===============================================

const API_BASE = "http://localhost:8080/api/bff";

// ===============================================
// CALLBACK PARA SABER SI LA API ESTÁ ACTIVA
// ===============================================

let apiStatusCallback = null;

export const setApiStatusCallback = (callback) => {
  apiStatusCallback = callback;
};

// ===============================================
// FUNCIÓN GENERAL FETCH
// ===============================================

async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: options.method || "GET",

      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },

      body: options.body
        ? JSON.stringify(options.body)
        : undefined,
    });

    // Si hay error HTTP
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Cambia estado API a ONLINE
    if (apiStatusCallback) {
      apiStatusCallback(true);
    }

    // DELETE no devuelve contenido
    if (response.status === 204 || options.method === "DELETE") {
      return null;
    }

    // Convertir respuesta
    const data = await response.json();

    return data;

  } catch (error) {

    console.error("Error API:", error);

    // Cambia estado API a OFFLINE
    if (apiStatusCallback) {
      apiStatusCallback(false);
    }

    throw error;
  }
}

// ===============================================
// DASHBOARD
// ===============================================

export const getDashboard = () =>
  apiFetch("/dashboard");

// ===============================================
// PROYECTOS
// ===============================================

export const getProyectos = () =>
  apiFetch("/proyectos");

export const getProyectoById = (id) =>
  apiFetch(`/proyectos/${id}`);

export const createProyecto = (proyecto) =>
  apiFetch("/proyectos", {
    method: "POST",
    body: proyecto,
  });

export const updateProyecto = (id, proyecto) =>
  apiFetch(`/proyectos/${id}`, {
    method: "PUT",
    body: proyecto,
  });

export const deleteProyecto = (id) =>
  apiFetch(`/proyectos/${id}`, {
    method: "DELETE",
  });

// ===============================================
// CLIENTES
// ===============================================

export const getClientes = () =>
  apiFetch("/clientes");

export const getClienteById = (id) =>
  apiFetch(`/clientes/${id}`);

export const createCliente = (cliente) =>
  apiFetch("/clientes", {
    method: "POST",
    body: cliente,
  });

export const updateCliente = (id, cliente) =>
  apiFetch(`/clientes/${id}`, {
    method: "PUT",
    body: cliente,
  });

export const deleteCliente = (id) =>
  apiFetch(`/clientes/${id}`, {
    method: "DELETE",
  });

// ===============================================
// RECURSOS
// ===============================================

export const getRecursos = () =>
  apiFetch("/recursos");

export const getRecursoById = (id) =>
  apiFetch(`/recursos/${id}`);

export const createRecurso = (recurso) =>
  apiFetch("/recursos", {
    method: "POST",
    body: recurso,
  });

export const updateRecurso = (id, recurso) =>
  apiFetch(`/recursos/${id}`, {
    method: "PUT",
    body: recurso,
  });

export const deleteRecurso = (id) =>
  apiFetch(`/recursos/${id}`, {
    method: "DELETE",
  });

// ===============================================
// EQUIPOS
// ===============================================

export const getEquipos = () =>
  apiFetch("/recursos/equipos");

export const createEquipo = (equipo) =>
  apiFetch("/recursos/equipos", {
    method: "POST",
    body: equipo,
  });

// ===============================================
// ANALÍTICA
// ===============================================

export const getKpis = () =>
  apiFetch("/analytics/kpis");

export const getReportes = () =>
  apiFetch("/analytics/reportes");

export const createReporte = (reporte) =>
  apiFetch("/analytics/reportes", {
    method: "POST",
    body: reporte,
  });

// ===============================================
// EXPORT DEFAULT
// ===============================================

const api = {
  getDashboard,

  // proyectos
  getProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto,

  // clientes
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,

  // recursos
  getRecursos,
  getRecursoById,
  createRecurso,
  updateRecurso,
  deleteRecurso,

  // equipos
  getEquipos,
  createEquipo,

  // analítica
  getKpis,
  getReportes,
  createReporte,
};

export default api;