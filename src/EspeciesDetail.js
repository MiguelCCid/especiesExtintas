import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EspeciesContext } from './EspeciesProvider';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const EspecieDetail = () => {
  const { id } = useParams();
  const { data, loading } = useContext(EspeciesContext);

  if (loading) return <p>Cargando especie...</p>;

  const especie = data.find(e => String(e.id) === id);

  if (!especie) return <p>Especie no encontrada.</p>;

  return (
    <Container className="mt-4">
      <h2>{especie.nombre}</h2>
      <Row className="mt-3">
        <Col md={6}>
          <Image src={`/imagenes/${especie.imagen}`} fluid />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <p><strong>Período:</strong> {especie.periodo}</p>
              <p><strong>Hábitat:</strong> {especie.habitat}</p>
              <p><strong>Tipo:</strong> {especie.tipo_animal}</p>
              <p><strong>Causas de extinción:</strong> {especie.causas.join(', ')}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EspecieDetail;
