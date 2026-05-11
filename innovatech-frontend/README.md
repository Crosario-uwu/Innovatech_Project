# Innovatech Solutions – Frontend React

Portal de gestión conectado al BFF (Backend for Frontend) y microservicios Spring Boot.

## Arquitectura

```
Frontend React (puerto 3000)
        │
        ▼
BFF Spring Boot (puerto 8080)  ←── innovatechBackend
        │
   ┌────┼────┐
   ▼    ▼    ▼
8081  8082  8083
Proyectos Recursos Analítica
```

## Estructura de carpetas

```
src/
├── components/
│   ├── Sidebar.jsx        ← Menú lateral de navegación
│   ├── Topbar.jsx         ← Barra superior con estado API
│   ├── Modal.jsx          ← Modal reutilizable para CRUD
│   ├── StatusBadge.jsx    ← Badge de estado coloreado
│   └── StateHelpers.jsx   ← Spinner, Error, EmptyState
├── context/
│   └── AppContext.jsx     ← Estado global (estado API)
├── pages/
│   ├── Dashboard.jsx      ← Vista consolidada del sistema
│   ├── Proyectos.jsx      ← CRUD Proyectos → BFF /proyectos
│   ├── Clientes.jsx       ← CRUD Clientes  → BFF /clientes
│   ├── Recursos.jsx       ← CRUD Recursos  → BFF /recursos
│   ├── Equipos.jsx        ← Vista agrupada por rol
│   ├── Kpis.jsx           ← KPIs → BFF /analytics/kpis
│   └── Reportes.jsx       ← Reportes → BFF /analytics/reportes
├── routes/
│   └── AppRoutes.jsx      ← Definición de rutas React Router
├── services/
│   └── api.js             ← Todas las llamadas al BFF
├── App.jsx
├── App.css
└── index.js
```

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo desarrollo
npm start
```

> El frontend se abre en http://localhost:3000

## Requisitos previos

Tener corriendo los servicios Spring Boot:

| Servicio              | Puerto |
|-----------------------|--------|
| innovatechBackend     | 8080   |
| innovatechProject     | 8081   |
| innovatechRecursos    | 8082   |
| innovatechAnalitica   | 8083   |

## Endpoints BFF consumidos

| Página     | Método | Endpoint BFF              |
|------------|--------|---------------------------|
| Dashboard  | GET    | /api/bff/dashboard        |
| Proyectos  | CRUD   | /api/bff/proyectos        |
| Clientes   | CRUD   | /api/bff/clientes         |
| Recursos   | CRUD   | /api/bff/recursos         |
| KPIs       | GET    | /api/bff/analytics/kpis   |
| Reportes   | GET    | /api/bff/analytics/reportes|
