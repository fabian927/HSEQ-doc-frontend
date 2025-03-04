import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";

const FormCreateUser = ({onDataForm}) => {
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    doc_type: "",
    document: "",
    email: "",
    phone: "",
    address: "",
    birthdate: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    console.log("Datos del usuario:", userData);
    onDataForm(userData);
  };

  return (
    <Container>
      <HeaderFrom>Crear Usuario</HeaderFrom>
      <Form>
        <Row className="justify-content-center">
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Nombres</Form.Label>
              <Form.Control
                name="name"
                placeholder="Nombres"
                value={userData.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Apellidos</Form.Label>
              <Form.Control
                name="last_name"
                placeholder="Apellidos"
                value={userData.last_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Tipo de documento</Form.Label>
              <Form.Select
                name="doc_type"
                value={userData.doc_type}
                onChange={handleChange}
              >
                <option value="">Opciones</option>
                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Documento</Form.Label>
              <Form.Control
                name="document"
                placeholder="Documento"
                value={userData.document}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Correo</Form.Label>
              <Form.Control
                name="email"
                placeholder="Correo@example.com"
                value={userData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Celular</Form.Label>
              <Form.Control
                name="phone"
                placeholder="Celular"
                value={userData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Dirección</Form.Label>
              <Form.Control
                name="address"
                placeholder="Dirección"
                value={userData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <Form.Group className="mb-2">
              <Form.Label className="label" >Edad</Form.Label>
              <Form.Control
                name="age"
                placeholder="Edad"
                value={userData.age}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <ButtonContainer>
          <StyledButton onClick={onSubmit}>Crear Usuario</StyledButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default FormCreateUser;

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  text-align: left;
  max-width: 100%;
  width: 1000px;

  .label{
    font-weight: bold;
  }
`;

const HeaderFrom = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  font-family: Helvetica, sans-serif;
  color: white;
  width: 100%;
  max-width: 200px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  place-items: center; 
`;

