import React, {useState} from 'react';
import NavBarApp from '@/components/navBarComponent/NavBarApp';
import { tipoAcceso, elementsProtected, preguntas } from '../../../../assets/infoPertmitionHeights/infoPermHeights';
import styled from 'styled-components'
import { Formik, Form, Field  } from 'formik';
import * as Yup from 'yup';
import PartPermitionH from './PartPermitionH';
import ResPermitionH from './ResPermitionH';
import ToastApp from '@/components/toastComponent/ToastApp';
import { usePermissionHeightsControl } from './PermissionHeightsControl';

const WorkPermitionHeightsApp = () => {
    const [isOpen, setIsOpen] = useState(false);  
    const [toast, setToast] = useState(null);
    const [id, setId] = useState(null);
    const [desButton, setDesButton] = useState(true);

    const usePermissionSubmit = usePermissionHeightsControl();
    
    const handleToggle = () => {
        setIsOpen(!isOpen); 
    };

    const initialChecklist = tipoAcceso.reduce((acc, item) => {
        acc[item.name] = false;
        return acc;
    }, {});

    const initialChecklist2 = elementsProtected.reduce((acc, item) => {
        acc[item.name] = false;
        return acc;
    }, {});

    const validationSchema = Yup.object().shape({
      responsable: Yup.string().required('Campo obligatorio'),
      proyecto: Yup.string().required('Campo obligatorio'),
      ejecutor: Yup.string().required('Campo obligatorio'),
      fechaInicioTrab: Yup.string().required('Campo obligatorio'),
      fechaFinTrab: Yup.string().required('Campo obligatorio'),
      equipo: Yup.string().required('Campo obligatorio'),
      alturaTrabajo: Yup.string().required('Campo obligatorio'),
      alturaCaida: Yup.string().required('Campo obligatorio'),
      lugarExacto: Yup.string().required('Campo obligatorio'),
      departamento: Yup.string().required('Campo obligatorio'),
      municipio: Yup.string().required('Campo obligatorio'),
      nPersonas: Yup.string().required('Campo obligatorio'),
      actividad: Yup.string().required('Campo obligatorio'),
    });

    return (
      <Container>
        <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
          <Content isOpen={isOpen}>
            <ContentForm>
              <Title>Permiso de Trabajo en alturas</Title>
              <BodyForm>
                <Formik
                  initialValues={{
                    responsable: '',
                    proyecto: '',
                    ejecutor: '',
                    fechaInicioTrab: '',
                    fechaFinTrab: '',
                    equipo: '',
                    alturaTrabajo: '',
                    alturaCaida: '',
                    lugarExacto: '',
                    departamento: '',
                    municipio: '',
                    nPersonas: '',
                    actividad: '',
                    otroElemento: '',
                    otroElementoProtect: '',
                    herramientas: '',
                    observaciones: '',
                    ...initialChecklist,
                    ...initialChecklist2,
                    ...preguntas.reduce((acc, _, index) => {
                      acc[`pregunta_${index}`] = "";
                      return acc;
                    }, {}),
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, {setSubmitting, resertForm}) => {
                    const accessType = Object.keys(values)
                      .filter((key) => tipoAcceso.some((item) => item.name === key))
                      .reduce((acc, key) => {
                        acc[key] = values[key];
                        return acc;
                      }, {});
                    
                    const elementsProtect = Object.keys(values)
                    .filter((key) => elementsProtected.some((item) => item.name === key))
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
                      responsable: values.responsable,
                      proyecto: values.proyecto,
                      ejecutor: values.ejecutor,
                      fechaInicioTrab: values.fechaInicioTrab,
                      fechaFinTrab: values.fechaFinTrab,
                      equipo: values.equipo,
                      alturaTrabajo: values.alturaTrabajo,
                      alturaCaida: values.alturaCaida,
                      lugarExacto: values.lugarExacto,
                      departamento: values.departamento,
                      municipio: values.municipio,
                      nPersonas: values.nPersonas,
                      actividad: values.actividad,
                      accessType,
                      otroElemento: values.otroElemento,
                      elementsProtect,
                      otroElementoProtect: values.otroElementoProtect,
                      herramientas: values.herramientas,
                      preguntas: preguntasFormateadas,
                      observaciones: values.observaciones,
                    };

                    console.log('datos finales de pertmiso uras: ', datosFinales);

                    await usePermissionSubmit(datosFinales, (response) => {
                        console.log("response ",response.data.permission_id);

                      if (response.success) {
                        setToast({type:"success", message:"Permiso de alturas guardado correctamente!", duration:"3000"});
                        setId(response.data.permission_id);
                        setDesButton(false);
                      } else {
                        setToast({type:"error", message: response.error});
                      }
                    });
    
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
                          <Label htmlFor='fechaFinTrab'>Fecha Cierre</Label>
                          <StyledField
                            id="fechaFinTrab"
                            name="fechaFinTrab"
                            type="datetime-local"
                          />
                          {errors.fechaFinTrab && touched.fechaFinTrab && (
                            <ErrorMessage>{errors.fechaFinTrab}</ErrorMessage>
                          )}
                        </div>
                        <div>
                          <Label htmlFor='equipo'>Equipo a intervenir</Label>
                          <StyledField
                            id="equipo"
                            name="equipo"
                            placeholder="Equipo a intervenir"
                          />
                          {errors.equipo && touched.equipo && (
                            <ErrorMessage>{errors.equipo}</ErrorMessage>
                          )}
                        </div>
                      </FormGrid>
                      <FormGrid>
                        <div>
                          <Label htmlFor='alturaTrabajo'>Altura aproximada de trabajo</Label>
                          <StyledField
                            id="alturaTrabajo"
                            name="alturaTrabajo"
                            placeholder="Altura en metros"
                          />
                          {errors.alturaTrabajo && touched.alturaTrabajo && (
                            <ErrorMessage>{errors.alturaTrabajo}</ErrorMessage>
                          )}
                        </div>
                        <div>
                          <Label htmlFor='alturaCaida'>Altura de caida total</Label>
                          <StyledField
                            id="alturaCaida"
                            name="alturaCaida"
                            placeholder="Altura en metros"
                          />
                          {errors.alturaCaida && touched.alturaCaida && (
                            <ErrorMessage>{errors.alturaCaida}</ErrorMessage>
                          )}
                        </div>
                        <div>
                          <Label htmlFor='lugarExacto'>Lugar sitio exacto</Label>
                          <StyledField
                            id="lugarExacto"
                            name="lugarExacto"
                            placeholder="Lugar exacto"
                          />
                          {errors.lugarExacto && touched.lugarExacto && (
                            <ErrorMessage>{errors.lugarExacto}</ErrorMessage>
                          )}
                        </div>
                      </FormGrid>
                      <FormGrid>
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
                        <div>
                          <Label htmlFor='nPersonas'>N° de personas certificadas</Label>
                          <StyledField
                            id="nPersonas"
                            name="nPersonas"
                            placeholder="Personas certificadas para el trabajo en alturas"
                          />
                          {errors.nPersonas && errors.nPersonas &&(
                            <ErrorMessage>{errors.nPersonas}</ErrorMessage>
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

                      <SubTitle>Tipo de acceso (marque el tipo de acceso a usar en el desarrollo del trabajo)</SubTitle>                                        
                      <FormGrid>
                        {tipoAcceso.map((item) => (
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

                      <SubTitle>Elementos de protección personal y sistemas de protección contra caídas mínimos que deberán ser utilizados por los trabajadores durante la labor</SubTitle>                                        
                      <FormGrid>
                        {elementsProtected.map((item) => (
                          <ChecklistItem key={item.name}>
                            <Field type="checkbox" name={item.name} />
                            {item.label}
                          </ChecklistItem>
                        ))}
    
                        {values.otroE && (
                          <div style={{ gridColumn: '1 / -1' }}>
                            <Label htmlFor="otroElementoProtect">Especifique otro elemento</Label>
                            <StyledField name="otroElementoProtect" placeholder="¿Cuál?" />
                          </div>
                        )}                    
                      </FormGrid>

                      <SubTitle>Escriba las herramientas a utilizar durante la actividad</SubTitle>   
                      <div>
                        <Label htmlFor='herramientas'>Herramientas a utilizar</Label>
                        <StyledField
                          id="herramientas"
                          name="herramientas"
                          placeholder="Ej: Llaves, alicates, taladro, etc."
                        />
                        {errors.herramientas && errors.herramientas &&(
                          <ErrorMessage>{errors.herramientas}</ErrorMessage>
                        )}
                      </div>

                      <SubTitle>Planeación y aseguramiento</SubTitle>  
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
                      <div>
                        <Label htmlFor='observaciones'>Observaciones</Label>
                        <StyledField
                          id="observaciones"
                          name="observaciones"
                        />
                        {errors.observaciones && errors.observaciones &&(
                          <ErrorMessage>{errors.observaciones}</ErrorMessage>
                        )}
                      </div>

                      <ButtonContent>
                        {desButton && <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </Button>}
                      </ButtonContent>
                    </Form>
                  )}

                </Formik>
                
                <SubTitle>Firma del personal participante</SubTitle>  
                <p>"Como trabajador he socializado el análisis de peligros por actividad (APA), comprendo las precauciones que deben ser tomadas y me comprometo a  desarrollar el trabajo cumpliendo las medidas de seguridad establecidas, procurando el autocuidado, cumpliendo procedimientos y evitando actos inseguros, así como reportar cualquier daño de equipos o incidentes y/o accidentes presentados."  </p>  
                <PartPermitionH id={id}/>

                <SubTitle>Firma de responsables</SubTitle>  
                <p>Como coordinador de trabajo en alturas confirmo que he revisado e identificado en sitio, las condiciones de riesgo presentes para el desarrollo del presente trabajo,  he divulgado a los trabajadores y he propuestomedidas de prevención para controlar los factores de riesgo</p>
                <p>Como responsable de activar el plan de emergencia, he revisado e identificado el sitio, las condicones de riesgos para del desarrollo del presente trabajo, se tien listo los equipos de primeros auxilios y brigadista en caso de realizar rescate de acuerdo al procedimiento a realizar</p>
                <p>Como supervisor y ejecutor confirmo que el grupo de trabajo es el adecuado para realizar la labor, conocen los peligros y riesgos a los cuales van a estar expuestos, se les ha explicado las medidas de control y se han implementado las mismas en pro de evitar la ocurrencia de eventos no deseados. Las herramientas han sido inspecciones y se cuentan con los elementos de protección personal requeridos para la labor.</p>
                <p>Como ejecutor confirmo que el trabajo/actividad se ha concluido de acuerdo a lo planeado. El área de trabajo ha quedando en optimas condiciones de orden y aseo. Quedan en funcionamiento los sistemas de protección o seguridad de los equipos y/o sistemas intervenidos.</p>
                <p>Como autoridad de área/interventor, confirmo que el área ha quedado en limpia, ordena y en condiciones seguras de operación/funcionamiento.</p>

                <ResPermitionH id={id}/>

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
    );
}

export default WorkPermitionHeightsApp

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

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
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
  font-size: 1.5rem;
  padding: 0.8rem;
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
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  margin-top: 1rem;
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