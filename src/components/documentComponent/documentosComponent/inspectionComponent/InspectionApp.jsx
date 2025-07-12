import React, { useState } from 'react'
import { Formik, Form, Field  } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'
import NavBarApp from '@/components/navBarComponent/NavBarApp';
import PartInspection from './PartInspection';
import {preguntasHerramientas } from '../../../../assets/infoInspection/InfoInspection';
import ToastApp from '@/components/toastComponent/ToastApp';
import {useInspectionControl} from './InspectionControl';
import { duration } from '@mui/material';


const InspectionApp = () => {
  const [isOpen, setIsOpen] = useState(false);  
  const [toast, setToast] = useState(null);
  const [id, setId] = useState(null);

  const inspectionSubmit = useInspectionControl();

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  const validationSchema = Yup.object().shape({
    fechaInicioTrab: Yup.string().required('Campo obligatorio')
  });

  return (
    <Container>
      <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen}>
        <ContentForm>
          <Title>Inspección de Herramientas Manuales</Title>
          <BodyForm>
            <Formik
              initialValues={{
                responsable: '',
                proyecto: '',
                ejecutor: '',
                fechaInicioTrab: '',
                departamento: '',
                municipio: '',
                actividad: '',
                ...preguntasHerramientas .reduce((acc, _, index) => {
                  acc[`pregunta_${index}`] = "";
                  return acc;
                }, {}),
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, {setSubmitting, resertForm}) => {

                const preguntasFormateadas = Object.keys(values)
                  .filter((key) => key.startsWith("pregunta_"))
                  .map((key) => ({
                    numero: parseInt(key.split("_")[1]),
                    respuesta: values[key],
                  }));

                const datosFinales = {
                  userId: localStorage.getItem('userId'),
                  responsable: values.responsable,
                  proyecto: values.proyecto,
                  ejecutor: values.ejecutor,
                  fechaInicioTrab: values.fechaInicioTrab,
                  departamento: values.departamento,
                  municipio: values.municipio,
                  actividad: values.actividad,
                  preguntas: preguntasFormateadas,
                };

                await inspectionSubmit(datosFinales, (response) =>{
                  if (response) {
                    setToast({type: "success", message: "¡Inspección de Herramientas Manuales guardado correctamente!", duration: "3000"});
                    setId(response.data.inspection_id);
                  }else{
                    setToast({type:"error", message: response.error});
                  }
                });
                console.log('datosFinales ', datosFinales);

                setSubmitting(false);
              }}
            >
              {({values, errors, touched, isSubmitting}) => (
                <Form>
                  <FormGrid>
                    <div>
                      <Label htmlFor="responsable">Responsable</Label>
                      <StyledField 
                        id="responsable" 
                        name="responsable" 
                        placeholder="Nombre Completo" 
                      />
                      {errors.responsable && touched.responsable && (
                        <ErrorMessage>{errors.responsable}</ErrorMessage>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="proyecto">Planta / Proyecto</Label>
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
                      <Label htmlFor="ejecutor">¿Quien ejecuta?</Label>
                      <StyledField 
                        id="ejecutor" 
                        name="ejecutor" 
                        placeholder="Ejecutor" 
                      />
                      {errors.ejecutor && touched.ejecutor && (
                        <ErrorMessage>{errors.ejecutor}</ErrorMessage>
                      )}
                    </div>
                  </FormGrid>
                  <FormGrid>
                    <div>
                      <Label htmlFor='fechaInicioTrab'>Fecha Inicio</Label>
                      <StyledField
                        id="fechaInicioTrab"
                        name="fechaInicioTrab"
                        type="datetime-local"
                      />
                      {errors.fechaInicioTrab && touched.fechaInicioTrab && (
                        <ErrorMessage>{errors.fechaInicioTrab}</ErrorMessage>
                      )}
                    </div>
                    <div>
                      <Label htmlFor='departamento'>Departamento</Label>
                      <StyledField
                        id="departamento"
                        name="departamento"
                        placeholder="Departamento"
                      />
                      {errors.departamento && touched.departamento && (
                        <ErrorMessage>{errors.departamento}</ErrorMessage>
                      )}
                    </div>
                    <div>
                      <Label htmlFor='municipio'>Municipio</Label>
                      <StyledField
                        id="municipio"
                        name="municipio"
                        placeholder="Municipio"
                      />
                      {errors.municipio && errors.municipio &&(
                        <ErrorMessage>{errors.municipio}</ErrorMessage>
                      )}
                    </div>
                  </FormGrid>
                  <div>
                    <Label htmlFor='actividad'>Actividad a realizar</Label>
                    <StyledField
                      id="actividad"
                      name="actividad"
                      placeholder="Descripcion de la actividad"
                    />
                    {errors.actividad && errors.actividad &&(
                      <ErrorMessage>{errors.actividad}</ErrorMessage>
                    )}
                  </div>
                  <SubTitle>Preguntas de estandares de seguridad</SubTitle>
                  <TablaPreguntas>
                    <thead>
                      <tr>
                        <th>Herramientas</th>
                        <th>Estandares de seguridad</th>
                        <th>Si</th>
                        <th>No</th>
                        <th>NA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preguntasHerramientas.map((pregunta, index) => (
                        <tr key={index}>
                          <td>{pregunta.Herramienta}</td>
                          <td>{pregunta.Texto}</td>
                          {["Si", "No", "NA"].map((opcion) => (
                            <td key={opcion}>
                              <Field
                                type="radio"
                                name={`pregunta_${index}`}
                                value={opcion}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </TablaPreguntas>
                  <ButtonContent>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </ButtonContent>
                </Form>
              )}
            </Formik>
            <div>
              <SubTitle>Firmas de quienes inspeccionan</SubTitle>
              <PartInspection id={id}/>
            </div>
            {toast && (
              <ToastApp
                key={toast.type + toast.message}
                type={toast.type}
                message={toast.message}
                duration={3000}
              />
            )}
          </BodyForm>
        </ContentForm>
      </Content>
    </Container>
  )
}

export default InspectionApp

const TablaPreguntas = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
  font-size: 14px;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #e0e0e0;
  }

  td:first-child,
  td:nth-child(2) {
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
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

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: block;
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  max-height: fit-content;
  width: 200px;

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

const BodyForm = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ContentForm = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 15px auto; /* Centrado horizontal */
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

const Title2 = styled.h2`
  text-align: center;
  color: black;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
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
  padding: 20px;
  margin-left: ${({ isOpen }) => isOpen ? "250px" : "60px"};
  transition: margin-left 0.3s ease;
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

const Title = styled.h1`
  background-color: #4CAF50;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  padding: 0.8rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  border-radius: 5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;