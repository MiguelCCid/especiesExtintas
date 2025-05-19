import React, { createContext, useState, useEffect } from "react";

export const EspeciesContext = createContext();

export const EspeciesProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/especies.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);

  const eliminarEspecie = (id) => {
    setData(prev => prev.filter(e => e.id !== id));
};

  return (
    <EspeciesContext.Provider value={{ data, loading, eliminarEspecie }}>
      {children}
    </EspeciesContext.Provider>
  );
};
