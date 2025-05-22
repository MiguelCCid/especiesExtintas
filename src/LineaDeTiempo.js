import React, { useContext, useState } from 'react';
import { EspeciesContext } from './EspeciesProvider';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Form, Card, Row, Col } from 'react-bootstrap';

const LineaDeTiempo = () => {
  const { data } = useContext(EspeciesContext);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');
  const [periodoClicado, setPeriodoClicado] = useState(null);

  const periodosUnicos = [...new Set(data.map(e => e.periodo))].sort();

  const especiesFiltradas = periodoSeleccionado
    ? data.filter(e => e.periodo === periodoSeleccionado)
    : data;

  const periodosContados = especiesFiltradas.reduce((acc, especie) => {
    acc[especie.periodo] = (acc[especie.periodo] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(periodosContados).map(([periodo, cantidad]) => ({
    periodo,
    cantidad,
  }));

  const sortedData = chartData.sort((a, b) => a.periodo.localeCompare(b.periodo));

  const especiesDelPeriodoClicado = periodoClicado
    ? data.filter(e => e.periodo === periodoClicado)
    : [];

  return (
    <div style={{ width: '100%', padding: '2rem' }}>
      <h3>Línea de Tiempo de Extinciones</h3>

      <Form.Group className="mb-4" controlId="selectPeriodo">
        <Form.Label>Filtrar por período</Form.Label>
        <Form.Select
          value={periodoSeleccionado}
          onChange={(e) => {
            setPeriodoSeleccionado(e.target.value);
            setPeriodoClicado(null); 
          }}
        >
          <option value="">Todos</option>
          {periodosUnicos.map((periodo, idx) => (
            <option key={idx} value={periodo}>{periodo}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {sortedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
            onClick={(data) => {
              if (data?.activeLabel) {
                setPeriodoClicado(data.activeLabel);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="periodo" type="category" />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No hay especies en ese período.</p>
      )}

      {periodoClicado && (
        <>
          <h4 className="mt-5">Especies extintas en: {periodoClicado}</h4>
          <Row className="mt-3">
            {especiesDelPeriodoClicado.map((especie) => (
              <Col key={especie.id} md={4} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={`/imagenes/${especie.imagen}`} />
                  <Card.Body>
                    <Card.Title>{especie.nombre}</Card.Title>
                    <Card.Text>
                      <strong>Hábitat:</strong> {especie.habitat}<br />
                      <strong>Causas:</strong> {Array.isArray(especie.causas) ? especie.causas.join(', ') : especie.causas}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default LineaDeTiempo;
