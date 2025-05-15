import React, { useContext, useState } from 'react';
import { EspeciesContext } from './EspeciesProvider';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const ListaEspecies = () => {
  const { data, loading } = useContext(EspeciesContext);
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const [filtroHabitat, setFiltroHabitat] = useState('');

  if (loading) return <p>Cargando especies...</p>;

 

  const periodos = [...new Set(data.map(e => e.periodo))];
  const habitats = [...new Set(data.map(e => e.habitat))];


  const especiesFiltradas = data.filter(e => {
    return(
        (filtroPeriodo === '' || e.periodo === filtroPeriodo) &&
        (filtroHabitat === '' || e.habitat === filtroHabitat)
    );
  });

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
                  <Card.Title>{especie.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Período:</strong> {especie.periodo}<br />
                    <strong>Hábitat:</strong> {especie.habitat}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No se encontraron especies con esos filtros.</p>
        )}
      </Row>
    </Container>
  );
};

export default ListaEspecies;
