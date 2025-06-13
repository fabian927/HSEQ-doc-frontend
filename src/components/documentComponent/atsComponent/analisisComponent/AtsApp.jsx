import React, { useState } from 'react'
import NavBarApp from '@/components/navBarComponent/NavBarApp';
import { dataAts } from '../../../../assets/infoAts/InfoAts';
import styled from 'styled-components'
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import Table2App from '../../../tableComponent/Table2App';

const AtsApp = () => {
  const [isOpen, setIsOpen] = useState(false);  

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  const validationSchema = Yup.object().shape({
    proyecto: Yup.string().required('Campo obligatorio'),
    fecha: Yup.string().required('campo obligatorio'),
    actividad: Yup.string().required('campo obligatorio'),
    responsable: Yup.string().required('campo obligatorio'),
    ejecutor: Yup.string().required('campo obligatorio'),
    // Agrega más validaciones según necesites
  });

  const datosEjemplo = [
  { nombre: "Laptop", cantidad: 5, precio: 1200 },
  { nombre: "Mouse", cantidad: 10, precio: 25.50 },
];

  return (
    <Container>
      <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen}>
        <ContentForm>
          <Title>Análisis de Trabajo Seguro</Title>
          <HeaderForm>
            <p>Código: CN-SST-FT-005</p>
            <p>Versión: 02</p>
            <p>Página: 01 de 02</p>
            <p>Fecha: 30/09/2024</p>
            <p>ATS N°: 1 </p>
          </HeaderForm> 
          <BodyForm>
            <SubTitle>DESCRIPCIÓN DE LA ACTIVIDAD</SubTitle>
            <Formik
              initialValues={{
                proyecto: '',
                fecha: '',
                actividad: '',
                responsable: '',
                ejecutor: '',
                // Agrega más campos según necesites
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <FormGrid>
                    <div>
                      <Label htmlFor="proyecto">Planta / Proyecto *</Label>
                      <StyledField 
                        id="proyecto" 
                        name="proyecto" 
                        placeholder="Nombre proyecto" 
                      />
                      {errors.proyecto && touched.proyecto && (
                        <ErrorMessage>{errors.proyecto}</ErrorMessage>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="fecha">Fecha de inicio</Label>
                      <StyledField 
                        id="fecha" 
                        name="fecha" 
                        type="datetime-local"
                        placeholder="Fecha de inicio" 
                      />
                      {errors.fecha && touched.fecha && (
                        <ErrorMessage>{errors.fecha}</ErrorMessage>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="actividad">Actividad a realizar</Label>
                      <StyledField 
                        id="actividad" 
                        name="actividad" 
                        placeholder="Actividad a realizar" 
                      />
                      {errors.actividad && touched.actividad && (
                        <ErrorMessage>{errors.actividad}</ErrorMessage>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="responsable">Nombre responsable</Label>
                      <StyledField 
                        id="responsable" 
                        name="responsable" 
                        placeholder="Responsable" 
                      />
                      {errors.responsable && touched.responsable && (
                        <ErrorMessage>{errors.responsable}</ErrorMessage>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="ejecutor">Quien ejecuta</Label>
                      <StyledField 
                        id="ejecutor" 
                        name="ejecutor" 
                        as="select"
                      >
                        <option value="">Seleccione un ejecutor</option>
                        <option value="juan">Conecta</option>
                        <option value="maria">Contratista</option>
                      </StyledField>
                      {errors.ejecutor && touched.ejecutor && (
                        <ErrorMessage>{errors.ejecutor}</ErrorMessage>
                      )}
                    </div>
                  </FormGrid>

                  <Table2App data={dataAts}/>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </BodyForm>  
        </ContentForm>
      </Content>
    </Container>
  )
}

export default AtsApp

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Arial, sans-serif;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) { // Tablet
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) { // Móvil
    grid-template-columns: 1fr;
  }
`;

const BodyForm = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HeaderForm = styled.div`
 display: flex;
 justify-content: space-between;
 padding-left: 40px;
 padding-right: 40px;
 font-size: 16px;
 font-weight: bold;
 font-family: Arial, sans-serif;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url('/image/home-image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  flex: 1;
  align-items: center;
  padding-top: 3rem;
  margin-left: ${({ isOpen }) => isOpen ? "250px" : "60px"};
  transition: margin-left 0.3s ease;
`;

const Title = styled.h1`
  background-color: #4CAF50;
  text-align: center;
  color: white;
  font-size: 2.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  border-radius: 5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.h1`
  background-color: #4CAF50;
  text-align: center;
  color: white;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;
`;

const ContentForm = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 20px auto; /* Centrado horizontal */
  padding: 20px;
  width: 90%; /* Porcentaje en lugar de fixed width */
  max-width: 1200px; /* Máximo ancho */
  min-height: auto; /* Altura flexible */
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  box-sizing: border-box; /* Incluye padding en el ancho */

  @media (max-width: 1024px) {
    padding: 15px;
    width: 95%;
  }

  @media (max-width: 768px) {
    margin: 10px auto;
    width: 98%;
    padding: 10px;
  }

  @media (max-width: 480px) {
    border-radius: 5px;
    margin: 5px auto;
    width: 100%;
    box-shadow: none;
    border: 1px solid #eee;
  }
`;