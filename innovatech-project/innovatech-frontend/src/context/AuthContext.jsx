import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Credenciales hardcodeadas (sin backend de auth)
// Puedes cambiarlas aquí o conectar a un endpoint real
const USERS = [
  { username: 'admin', password: 'innovatech2024', nombre: 'Administrador', rol: 'Admin' },
  { username: 'gestor', password: 'gestor123',     nombre: 'Gestor de Proyectos', rol: 'Gestor' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Restaurar sesión desde sessionStorage
    const saved = sessionStorage.getItem('innovatech_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) throw new Error('Usuario o contraseña incorrectos');
    const session = { username: found.username, nombre: found.nombre, rol: found.rol };
    sessionStorage.setItem('innovatech_user', JSON.stringify(session));
    setUser(session);
    return session;
  };

  const logout = () => {
    sessionStorage.removeItem('innovatech_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}