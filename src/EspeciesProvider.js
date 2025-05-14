import React, { createContext, useState, useEffect } from "react";

export const EspeciesContext = createContext();

export const EspeciesProvider = ({ children }) => {
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch("/especies.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  }, []);

  return (
    <EspeciesContext.Provider value={{ data }}>
      {children}
    </EspeciesContext.Provider>
  );
};
