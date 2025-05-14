import React, { useContext } from 'react';
import { EspeciesContext } from './EspeciesProvider';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ListaEspecies = () => {
  const { data, loading } = useContext(EspeciesContext);

  if (loading) return <p>Cargando especies...</p>;

  return (
    <Container className="mt-4">
      <Row>
        {data.map((especie) => (
          <Col key={especie.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`/imagenes/${especie.imagen}`} alt={especie.nombre} />
              <Card.Body>
                <Card.Title>{especie.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaEspecies;
