import React, { createContext, useContext, useState, useCallback } from 'react';
import { setApiStatusCallback } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [apiOnline, setApiOnline] = useState(true);

  const handleApiStatus = useCallback((ok) => {
    setApiOnline(ok);
  }, []);

  // Register the callback so api.js can update state
  setApiStatusCallback(handleApiStatus);

  return (
    <AppContext.Provider value={{ apiOnline }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
