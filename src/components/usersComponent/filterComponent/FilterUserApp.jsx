import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import H1 from 'react-bootstrap/Form';
import styled from 'styled-components';

const FilterUserApp = ({onFilter}) => {

  const [formData, setFormData] = useState({
    type: "1", 
    doc: ""
  });
  
  const onInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };
  
    const onSubmit = () => {
      if (formData.type === "2" && !formData.doc.trim()) {
        console.error("Documento no proporcionado");
        return;
      }
      onFilter(formData);
      setFormData((prev) => ({
        ...prev,
        doc: "" 
      }));
    };

  return (
    <Container>
        <StyledH1>Buscar Usuario</StyledH1>
          <StyledDiv >
              <Form.Select id="type" value={formData.type} onChange={onInputChange}>
              <option value="" >Opciones</option>
              <option value="1">Todo</option>
              <option value="2">Documento</option>
              </Form.Select>

              <Form.Group controlId="doc">
              <Form.Control type="text" placeholder="Buscar..." value={formData.doc || ""} onChange={onInputChange}/>
              </Form.Group>

              <StyledButton onClick={() => onSubmit()}>Buscar</StyledButton>
          </StyledDiv>
    </Container>
  )
}

export default FilterUserApp

const Container = styled.div`
  border-radius: 10px;
  min-height: 120px;
  background-color: white;
  margin: 30px;
  padding: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; 
  flex-direction: column;
`;

const StyledH1 = styled(H1)`
font-size: 25px;
color: black;
font-weight: bold;
font-family: Helvetica, sans-serif;
padding: 1rem;
`

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 15px; 
  width: 100%;
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
  max-width: 100px; 
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