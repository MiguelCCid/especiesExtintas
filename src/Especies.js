import React, { useContext, useState } from 'react';
import { EspeciesContext } from './EspeciesProvider';
import { Container, Row, Col, Card, Form, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ListaEspecies = () => {
  const { data, loading, eliminarEspecie } = useContext(EspeciesContext);
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const [filtroHabitat, setFiltroHabitat] = useState('');
  const navigate = useNavigate();

  const handleMostrarDetalles = (especie) => {
    navigate(`/especie/${especie.id}`);
  };

  if (loading) return <p>Cargando especies...</p>;

 

  const periodos = [...new Set(data.map(e => e.periodo))];
  const habitats = [...new Set(data.map(e => e.habitat))];


  const especiesFiltradas = data.filter(e => {
    return(
        (filtroPeriodo === '' || e.periodo === filtroPeriodo) &&
        (filtroHabitat === '' || e.habitat === filtroHabitat)
    );
  });

  const AgregarEspecie = () => {
    navigate("/agregar")
  };

  return (
    <Container className="mt-4">
      <Form className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Filtrar por período</Form.Label>
              <Form.Select value={filtroPeriodo} onChange={e => setFiltroPeriodo(e.target.value)}>
                <option value="">Todos</option>
                {periodos.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Filtrar por hábitat</Form.Label>
              <Form.Select value={filtroHabitat} onChange={e => setFiltroHabitat(e.target.value)}>
                <option value="">Todos</option>
                {habitats.map((h, i) => (
                  <option key={i} value={h}>{h}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row>
        {especiesFiltradas.length > 0 ? (
          especiesFiltradas.map(especie => (
            <Col key={especie.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`/imagenes/${especie.imagen}`} />
                <Card.Body>
                <Card.Title style={{ cursor: 'pointer' }} onClick={() => handleMostrarDetalles(especie)}>
                  {especie.nombre}
                </Card.Title>
                  <Card.Text>
                    <strong>Período:</strong> {especie.periodo}<br />
                    <strong>Hábitat:</strong> {especie.habitat}
                  </Card.Text>
                </Card.Body>
                <Button onClick={()=> eliminarEspecie(especie.id)}>Eliminar Especie</Button>
              </Card>
            </Col>
          ))
        ) : (
          <p>No se encontraron especies con esos filtros.</p>
        )}
      </Row>
      <Button onClick={AgregarEspecie}>Agregar Nueva Especie</Button>
      <Button onClick={() => navigate("/mapa")}>Ver Mapa</Button>

    </Container>
  );
};

export default ListaEspecies;
