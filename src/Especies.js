import React, { useContext, useState } from 'react';
import { EspeciesContext } from './EspeciesProvider';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListaEspecies = () => {
  const { data, loading, eliminarEspecie } = useContext(EspeciesContext);
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const [filtroHabitat, setFiltroHabitat] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const handleMostrarDetalles = (especie) => {
    navigate(`/especie/${especie.id}`);
  };

  if (loading) return <p>Cargando especies...</p>;

  const periodos = [...new Set(data.map(e => e.periodo))];
  const habitats = [...new Set(data.map(e => e.habitat))];

  const especiesFiltradas = data.filter(e => {
    const coincideBusqueda =
      busqueda === '' ||
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.causas.some(causa => causa.toLowerCase().includes(busqueda.toLowerCase()));

    return (
      coincideBusqueda &&
      (filtroPeriodo === '' || e.periodo === filtroPeriodo) &&
      (filtroHabitat === '' || e.habitat === filtroHabitat)
    );
  });

  const AgregarEspecie = () => {
    navigate("/agregar");
  };

  return (
    <Container className="mt-4">
      <Form className="mb-4 p-3 bg-light rounded shadow-sm">
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filtrar por período</Form.Label>
              <Form.Select value={filtroPeriodo} onChange={e => setFiltroPeriodo(e.target.value)}>
                <option value="">Todos</option>
                {periodos.map((p, i) => <option key={i} value={p}>{p}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filtrar por hábitat</Form.Label>
              <Form.Select value={filtroHabitat} onChange={e => setFiltroHabitat(e.target.value)}>
                <option value="">Todos</option>
                {habitats.map((h, i) => <option key={i} value={h}>{h}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Buscar por nombre o causa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row>
        {especiesFiltradas.length > 0 ? (
          especiesFiltradas.map(especie => (
            <Col key={especie.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <div style={{ overflow: 'hidden', height: '200px', objectFit: 'cover' }}>
                  <Card.Img
                    variant="top"
                    src={`/imagenes/${especie.imagen}`}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <Card.Body>
                  <Card.Title
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleMostrarDetalles(especie)}
                    className="text-primary"
                  >
                    {especie.nombre}
                  </Card.Title>
                  <Card.Text>
                    <strong>Período:</strong> {especie.periodo}<br />
                    <strong>Hábitat:</strong> {especie.habitat}<br />
                    <strong>Causas:</strong>
                    <ul className="mb-0">
                      {especie.causas.map((causa, idx) => (
                        <li key={idx}>{causa}</li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0 d-grid">
                  <Button
                    variant="outline-danger"
                    onClick={() => eliminarEspecie(especie.id)}
                  >
                    🗑 Eliminar Especie
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <p>No se encontraron especies con esos filtros.</p>
        )}
      </Row>

      <div className="mt-4 d-flex gap-2 flex-wrap">
        <Button  onClick={AgregarEspecie}> Agregar Nueva Especie</Button>
        <Button  onClick={() => navigate("/mapa")}> Ver Mapa</Button>
        <Button  onClick={() => navigate("/tiempo")}>Ver Línea de Tiempo</Button>
      </div>
    </Container>
  );
};

export default ListaEspecies;
