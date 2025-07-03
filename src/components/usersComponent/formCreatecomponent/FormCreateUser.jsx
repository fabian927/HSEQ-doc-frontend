import React, { useEffect, useState, useCallback } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import RollFetch from "../../../parametersDb/RollFetch";

const FormCreateUser = ({ onDataEdit, onDataForm, value}) => {
  const [nameForm, setNameForm] = useState(false);
  const [rolls, setRolls] = useState([]);
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
    roll_id: "",
    user: "",
    pass: "",
  });

  useEffect(() => {
    if (value) {
      setUserData({
        name: "",
        last_name: "",
        doc_type: "",
        document: "",
        email: "",
        phone: "",
        address: "",
        birthdate: "",
        age: "",
        roll_id: "",
        user: "",
        pass: "",
      });
    }
  }, [value]);

  const initialState = {
    name: "",
    last_name: "",
    doc_type: "",
    document: "",
    email: "",
    phone: "",
    address: "",
    birthdate: "",
    age: "",
    roll_id: "",
    user: "",
    pass: "",
  };

  const handleRolesResponse = useCallback((response) => {
    if (response.success) {
      setRolls(response.data.roll);
    } else {
      console.error("Error al cargar roles:", response.error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (onDataEdit?.person) {
      setNameForm(true);
      setUserData(onDataEdit.person);
    } else {
      setNameForm(false);
      setUserData(initialState);
    }
  }, [onDataEdit]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onDataForm(userData);
      setUserData(initialState);
    } catch (error) {
      console.error("Error al enviar formulario:", error);
    }
  };

  return (
    <>
      <RollFetch onResponse={handleRolesResponse} />
      <Container>
        <HeaderFrom>
          {nameForm ? "Editar Usuario" : "Crear Usuario"}
        </HeaderFrom>
        <Form>
          <Row className="justify-content-center">
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label" >Nombres</Form.Label>
                <Form.Control
                  name="name"
                  placeholder="Nombres"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label" >Apellidos</Form.Label>
                <Form.Control
                  name="last_name"
                  placeholder="Apellidos"
                  value={userData.last_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5}>
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
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label" >Documento</Form.Label>
                <Form.Control
                  name="document"
                  placeholder="Documento"
                  value={userData.document}
                  onChange={handleChange}
                  required="7"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label" >Correo</Form.Label>
                <Form.Control
                  name="email"
                  placeholder="Correo@example.com"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label" >Celular</Form.Label>
                <Form.Control
                  name="phone"
                  placeholder="Celular"
                  value={userData.phone}
                  onChange={handleChange}
                  required="10"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label" >Dirección</Form.Label>
                <Form.Control
                  name="address"
                  placeholder="Dirección"
                  value={userData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label" >Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="birthdate"
                  value={userData.birthdate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label" >Edad</Form.Label>
                <Form.Control
                  name="age"
                  placeholder="Edad"
                  value={userData.age}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label">Roll</Form.Label>
                <Form.Select
                  name="roll_id"
                  value={userData.roll_id}
                  onChange={handleChange}
                >
                  <option value="0">Seleccione un roll</option>
                  {rolls.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.roll}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>          
          <Row className="justify-content-center">
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label">Usuario (Confirmar correo)</Form.Label>
                <Form.Control
                  name="user"
                  placeholder="correo@ejemplo.com"
                  value={userData.user || ''}
                  onChange={handleChange}
                  required= "email"
                />
                {!userData.user && (
                  <Form.Text className="text-danger">
                    Este campo es obligatorio
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label className="label">Contraseña</Form.Label>
                <Form.Control
                  name="pass"
                  type="password"
                  placeholder="********"
                  value={userData.pass || ''}
                  onChange={handleChange}
                  required
                  minLength="8"
                />
                {!userData.pass && (
                  <Form.Text className="text-danger">
                    La contraseña es obligatoria
                  </Form.Text>
                )}
                {userData.pass && userData.pass.length < 8 && (
                  <Form.Text className="text-danger">
                    La contraseña debe tener al menos 8 caracteres
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
                    
          <ButtonContainer>
            <StyledButton onClick={onSubmit}>
              {nameForm ? "Editar Usuario" : "Crear Usuario"}
            </StyledButton>
          </ButtonContainer>
        </Form>
      </Container>
    </>
  );
};

export default FormCreateUser;

const Container = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  text-align: left;
  display: flexbox;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  width: 800px;

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

