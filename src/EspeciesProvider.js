import React, {createContext, useState, useEffect, Children} from "react";

export const EspeciesContext = createContext();

export const EspeciesProvider = ({children}) => {
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

    if (loading) return <p>Cargando datos...</p>;

    return (
        <EspeciesContext.Provider value={data}>
            {children}
        </EspeciesContext.Provider>
    );
}