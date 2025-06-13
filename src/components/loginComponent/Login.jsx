import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, FloatingLabel, Alert, FormGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onUser }) => {
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
  });
  const [error, setError] = useState("");

  const onInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
  
    if (!formData.user || !formData.pass) {
      setError("Por favor ingresa tu usuario y contraseña");
      return;
    }
  
    onUser(formData); 
  };

  return (
    
    <>
      <Container>
        <ContainerLogin>
          <Title>HSEQ.DOC</Title>
          <P>Iniciar Sesión</P>

          {error && <Alert variant="danger">{error}</Alert>}

          <StyledForm onSubmit={onSubmit}>

            <FormGroup className="mb-3" controlId="user">
              <Form.Label>Ususario</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="usuario@ejemplo.com" 
                value={formData.user}
                onChange={onInputChange}
              />
            </FormGroup>            
            <FormGroup className="mb-3" controlId="pass">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="********" 
                value={formData.pass}
                onChange={onInputChange}
              />
            </FormGroup>         
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100"
            >
              Iniciar Sesión
            </Button>
    
          </StyledForm>
        </ContainerLogin>        
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  min-height: 100vh;
  background-image: url("/image/image3.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  color: white;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const ContainerLogin = styled.div`
  background-color: #44449b81;
  border-radius: 15px;
  padding: 30px;
  margin: 30px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  font-family: sans-serif;
  color: white;
  font-weight: 600; 
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const P = styled.p`
  font-family: sans-serif;
  color: white;
  font-weight: 300;
  font-size: 1.5rem;
  text-align: left;
  margin-bottom: 2rem;
`;

const StyledForm = styled(Form)`
  .form-control {
    border-radius: 5px;
    padding: 12px 15px;
    border: 1px solid #dfe6e9;
    &:focus {
      border-color: #3498db;
      box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
    }
  }
  
  .btn {
    padding: 12px;
    font-size: 1rem;
    border-radius: 5px;
    margin-top: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;
