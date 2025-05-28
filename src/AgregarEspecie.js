import React, { useContext, useState } from 'react';
import { EspeciesContext } from './EspeciesProvider';
import { Container, Row, Col, Card, Form, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AgregarEspecie = () => {
    const { agregarEspecie } = useContext(EspeciesContext);
    const navigate = useNavigate();

    const [especie, setEspecie] = useState({
        nombre: "",
        periodo: "",
        habitat: "",
        causas: "",
        imagen: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEspecie(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        agregarEspecie(especie);
        navigate("/");
    };

    return (
        <Container>
            <h2>Agregar Nueva Especie</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={especie.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="periodo">
                    <Form.Label>Periodo</Form.Label>
                    <Form.Control
                        type="text"
                        name="periodo"
                        value={especie.periodo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="habitat">
                    <Form.Label>Hábitat</Form.Label>
                    <Form.Control
                        type="text"
                        name="habitat"
                        value={especie.habitat}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="causas">
                    <Form.Label>Causas</Form.Label>
                    <Form.Control
                        type="text"
                        name="causas"
                        value={especie.causas}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="imagen">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        name="imagen"
                        value={especie.imagen}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant='primary' type='submit' className="mt-3">
                    Agregar Especie
                </Button>
            </Form>
        </Container>
    );
};

export default AgregarEspecie;
