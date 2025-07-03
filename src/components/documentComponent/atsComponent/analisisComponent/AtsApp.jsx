import React, { useState, useCallback } from 'react'
import NavBarApp from '@/components/navBarComponent/NavBarApp';
import { dataAts, dataAts2, proElements, preguntas } from '../../../../assets/infoAts/InfoAts';
import styled from 'styled-components'
import { Formik, Form, Field  } from 'formik';
import * as Yup from 'yup';
import Table2App from '@/components/tableComponent/Table2App';
import Table3App from '@/components/tableComponent/Table3App';
import SelectFormApp from '@/components/formComponents/SelectFormApp';
import ParticipantesAts from './ParticipantesAts';
import ResponsablesAts from './ResponsablesAts';
import ToastApp from '@/components/toastComponent/ToastApp';
import { useAtsSubmit } from './AtsControl';


const AtsApp = () => {
  const [isOpen, setIsOpen] = useState(false);  
  const [openTable, setOpenTable] = useState(false);
  const [toast, setToast] = useState(null);
  const [id, setId] = useState(null);

  const atsSubmit = useAtsSubmit();

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  const handelButton = () => {
    setOpenTable(!openTable);
  };

  const initialChecklist = proElements.reduce((acc, item) => {
    acc[item.name] = false;
    return acc;
  }, {});

  const validationSchema = Yup.object().shape({
    proyecto: Yup.string().required('Campo obligatorio'),
    fecha: Yup.string().required('campo obligatorio'),
    actividad: Yup.string().required('campo obligatorio'),
    responsable: Yup.string().required('campo obligatorio'),
    ejecutor: Yup.string()
    .oneOf(['conecta', 'contratista'], 'Debe seleccionar una opción válida')
    .required('Campo obligatorio'),
    // Agrega más validaciones según necesites
  });

  return (
    <Container>
      <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen}>
        <ContentForm>
          <Title>Análisis de Trabajo Seguro</Title>
          <HeaderForm>
            <p>Código: CN-SST-FT-005</p>
            <p>Versión: 02</p>
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
                otro: false,
                requiereBloqueo: '',
                detalleBloqueo: '',
                otroElemento: '',
                tBloqueo: [],
                ...initialChecklist,
                ...preguntas.reduce((acc, _, index) => {
                  acc[`pregunta_${index}`] = "";
                  return acc;
                }, {}),
              }}
              validationSchema={validationSchema}
              onSubmit={async  (values, { setSubmitting }) => {
                const elementosProteccion = Object.keys(values)
                  .filter((key) => proElements.some((item) => item.name === key))
                  .reduce((acc, key) => {
                    acc[key] = values[key];
                    return acc;
                  }, {});

                const preguntasFormateadas = Object.keys(values)
                  .filter((key) => key.startsWith("pregunta_"))
                  .map((key) => ({
                    numero: parseInt(key.split("_")[1]),
                    respuesta: values[key],
                  }));

                const datosFinales = {
                  userId: localStorage.getItem('userId'),
                  proyecto: values.proyecto,
                  fecha: values.fecha,
                  actividad: values.actividad,
                  responsable: values.responsable,
                  ejecutor: values.ejecutor,
                  requiere_bloqueo: values.requiereBloqueo,
                  detalle_bloqueo: values.detalleBloqueo,
                  otro_elemento: values.otroElemento,
                  tBloqueo: values.tBloqueo,
                  elementosProteccion, 
                  preguntas: preguntasFormateadas, 
                };

                await atsSubmit(datosFinales, (response) => {

                  if (response.success) {
                    setToast({type:"success", message:"Analisis de Trabajo Seguro guardado correctamente!", duration:"3000"});
                    setId(response.data.ats_id);
                  } else {
                    setToast({type:"error", message: response.error});
                  }
                });

                setSubmitting(false);
              }}              
            >
              {({ values, errors, touched, isSubmitting }) => (
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
                      <SelectFormApp
                        name="ejecutor"
                        label="Quien ejecuta"
                        options={[
                          { value: '', label: 'Seleccione una opción' },
                          { value: 'conecta', label: 'Conecta' },
                          { value: 'contratista', label: 'Contratista' }
                        ]}
                      />
                    </div>

                    <Button type="button" onClick={handelButton}>
                      {openTable ? "Ocultar Analisis del Riesgo" : "Mostrar Analisis del Riesgo"}
                    </Button>
                  </FormGrid>

                  {openTable && <Table2App data={dataAts}/>}

                  <Table3App data = {dataAts2} />

                  <FormGrid>
                    <RadioGroup>
                      <Label>¿Requiere Bloqueo?</Label>
                      <RadioGroup>
                        <Label>
                          <Field type="radio" name="requiereBloqueo" value= "si" />
                          Si
                        </Label>

                        <Label>
                          <Field type="radio" name="requiereBloqueo" value="no" />
                          No
                        </Label>
                      </RadioGroup>
                    </RadioGroup>

                    <div>
                      <Label>Tipo de bloqueo</Label>
                      <FormGrid>
                        {['electrico', 'hidraulico', 'mecanico', 'otro', 'ninguno'].map((tipo) => (
                          <Label key={tipo}>
                            <Field
                              type="checkbox"
                              name="tBloqueo"
                              value={tipo}
                            />
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                          </Label>
                        ))}
                        {errors.tBloqueo && touched.tBloqueo && (
                          <ErrorMessage>{errors.tBloqueo}</ErrorMessage>
                        )}
                      </FormGrid>
                    </div>

                    <div>
                      <Field name="tBloqueo">
                        {({ field }) =>
                          field.value.includes('otro') && (
                            <>
                              <Label>Agregar bloqueo</Label>
                              <StyledField
                                type="text"
                                name="detalleBloqueo"
                                placeholder="¿Cuál?"
                              />
                            </>
                          )
                        }
                      </Field>
                    </div>
                  </FormGrid>

                  <SubTitle>ELEMENTOS DE PROTECCIÓN PERSONAL</SubTitle>
                  
                  <FormGrid>
                    {proElements.map((item) => (
                      <ChecklistItem key={item.name}>
                        <Field type="checkbox" name={item.name} />
                        {item.label}
                      </ChecklistItem>
                    ))}

                    {values.otro && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <Label htmlFor="otroElemento">Especifique otro elemento</Label>
                        <StyledField name="otroElemento" placeholder="¿Cuál?" />
                      </div>
                    )}                    
                  </FormGrid>

                  <SubTitle>Preguntas para verificar antes de iniciar la actividad</SubTitle>
                  <TablaPreguntas>
                    <thead>
                      <tr>
                        <th>Pregunta</th>
                        <th>Si</th>
                        <th>No</th>
                        <th>NA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preguntas.map((pregunta, index) => (
                        <tr key={index}>
                          <td>{pregunta}</td>
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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </Button>
                </Form>
              )}
            </Formik>
            <ParticipantesAts id={id} />
            <ResponsablesAts id={id} />
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

export default AtsApp

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

  td:first-child {
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const ChecklistItem = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  max-height: fit-content;

  &:hover {
    background-color: #45a049;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
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

const SubTitle3 = styled.h3`
  text-align: center;
  color: black;
  padding: 10px;
  font-size: 0.8rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const ContentForm = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 20px auto; /* Centrado horizontal */
  padding: 20px;
  width: 80%; /* Porcentaje en lugar de fixed width */
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