import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EspeciesContext } from './EspeciesProvider';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
    iconUrl: './684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const coordenadasLugares = {
  "Isla Mauricio": [-20.348404, 57.552152],
  "Australia": [-25.274398, 133.775136],
  "Tasmania": [-42.0406, 146.8087],
  "Sudáfrica": [-30.5595, 22.9375],
  "América del Norte": [54.5260, -105.2551],
  "Nueva Zelanda": [-40.9006, 174.8860],
  "Europa": [54.5260, 15.2551],
  "Asia": [34.0479, 100.6197],
  "Norte de África": [26.8206, 30.8025],
  "Atlántico Norte": [50.0, -30.0],
  "Siberia": [60.0, 105.0],
  "America": [15.7835, -90.2308],
  "Estados Unidos": [37.0902, -95.7129],
  "Cuba": [21.5218, -77.7812],
  "Río Yangtsé": [31.2304, 121.4737],
  "China": [35.8617, 104.1954]
};

const MapaEspecies = () => {
  const { data } = useContext(EspeciesContext);
  const navigate = useNavigate();

  const obtenerCoordenadas = (habitat) => {
    const lugares = habitat.split(',').map(lugar => lugar.trim());
    return lugares
      .map(lugar => coordenadasLugares[lugar])
      .filter(coords => coords !== undefined);
  };


  const especiesPorCoordenada = {};

  data.forEach(especie => {
    const posiciones = obtenerCoordenadas(especie.habitat);
    posiciones.forEach(pos => {
      const key = pos.join(',');
      if (!especiesPorCoordenada[key]) especiesPorCoordenada[key] = [];
      especiesPorCoordenada[key].push(especie);
    });
  });

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '90vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.entries(especiesPorCoordenada).map(([coordsStr, especies]) => {
        const [lat, lng] = coordsStr.split(',').map(Number);

        return (
          <Marker key={coordsStr} position={[lat, lng]} icon={customIcon}>
            <Popup>
              <div>
                <h5>Especies en esta zona:</h5>
                <ul style={{ paddingLeft: '1em' }}>
                  {especies.map(e => (
                    <li key={e.id}>
                      <button 
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: 'blue', 
                          cursor: 'pointer', 
                          textDecoration: 'underline', 
                          padding: 0,
                          fontSize: '1em' 
                        }}
                        onClick={() => navigate(`/especie/${e.id}`)}
                      >
                        {e.nombre}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapaEspecies;

