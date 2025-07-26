import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CanvaApp from '@/components/canvaComponent/CanvaApp';
import ModalApp from '@/components/modalComponent/ModalApp';
import Table4App from '@/components/tableComponent/Table4App';
import ToastApp from '@/components/toastComponent/ToastApp';
import {usePartPermissionHControl} from './PartPermissionHControl';

const PartPermitionH = ({id}) => {
  const [openModal, setOpenModal] = useState(false);
  const [firmaBase64, setFirmaBase64] = useState('');
  const [participantes, setParticipantes] = useState([]);
  const [toast, setToast] = useState(null);
  const [desButton, setDesButton] = useState (true);

  const partPermissionSubmit = usePartPermissionHControl();

  const validationSchema = Yup.object().shape({
    namePart: Yup.string().required('Campo obligatorio'),
    cedulaPart: Yup.string().matches(/^[0-9]+$/, 'Solo números').min(5, 'Mínimo 5 dígitos').required('Campo obligatorio'),
    cargoPart: Yup.string().required('Campo obligatorio'),
    empresaPart: Yup.string().required('Campo obligatorio'),
  });

  const columnas = [
    "Nombre", "Cédula", "Cargo", "Empresa", "Firma"
  ];

  const handelSubmit = (data) => {
    //console.log('click en el boton guardar participantes', data);
    partPermissionSubmit(data, (res) => {
      if (res.success) {
      setToast({type:"success", message:"Participantes guardados correctamente!", duration:"3000"});
      setDesButton(false);
      } else {
      setToast({type:"error", message: res.error});
      }
    });
  }
    
  return (
    <ContentForm>
      <Formik
        initialValues={{
          namePart: '',
          cedulaPart: '',
          cargoPart: '',
          empresaPart: '',
          firma: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const nuevoParticipante = {
          ...values,
          firma: firmaBase64,
          permissionId: id,
          };
          const updated = [...participantes, nuevoParticipante];
          setParticipantes(updated);
          //console.log('Nuevo array de participantes:', updated);

          setFirmaBase64('');
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <FormGrid>
              <div>
              <Label>Nombre</Label>
              <StyledField name="namePart" placeholder="Nombre completo" />
              {errors.namePart && touched.namePart && <ErrorMessage>{errors.namePart}</ErrorMessage>}
              </div>

              <div>
              <Label>Cédula</Label>
              <StyledField name="cedulaPart" placeholder="Cédula" />
              {errors.cedulaPart && touched.cedulaPart && <ErrorMessage>{errors.cedulaPart}</ErrorMessage>}
              </div>

              <div>
              <Label>Cargo</Label>
              <StyledField name="cargoPart" placeholder="Cargo" />
              {errors.cargoPart && touched.cargoPart && <ErrorMessage>{errors.cargoPart}</ErrorMessage>}
              </div>

              <div>
              <Label>Empresa</Label>
              <StyledField name="empresaPart" placeholder="Empresa" />
              {errors.empresaPart && touched.empresaPart && <ErrorMessage>{errors.empresaPart}</ErrorMessage>}
              </div>

              <div>
              <Button type="button" onClick={() => setOpenModal(true)}>
                Agregar Firma
              </Button>
              </div>
            </FormGrid>

            <Button type="submit">Agregar Participante</Button>

            <ModalApp
              state={openModal}
              setState={setOpenModal}
              tittle="Firma"
              viewHeader
              viewOverlay
              modalPosition="center"
              customPadding="10px"
              widthContainer="600px"
            >
              <CanvaApp
                onChange={(img) => {
                  setFirmaBase64(img);
                  setFieldValue('firma', img);
                }}
              />
            </ModalApp>
          </Form>
        )}
      </Formik>

      {participantes.length > 0 && (
        <div>
          <Table4App
            headers={columnas}
            data={participantes.map(p => [
            p.namePart,
            p.cedulaPart,
            p.cargoPart,
            p.empresaPart,
            <img src={p.firma} alt="firma" style={{ height: '40px' }} />
            ])}
          />
          {desButton && <Button type="button" 
            onClick={() => handelSubmit({ participantes })}
            disabled={participantes.length === 0}
          >
            Guargdar Participantes
          </Button>}
        </div>
      )}
      {toast && (
        <ToastApp
          key={toast.type + toast.message}
          type={toast.type}
          message={toast.message}
          duration={3000}
        />
      )}
    </ContentForm>
  )
}

export default PartPermitionH

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

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioOption = styled.label`
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const SubTitle = styled.h2`
  text-align: center;
  background: #4CAF50;
  color: white;
  padding: 10px;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -8px;
`;

const ContentForm = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 20px auto; 
  width: fixed; 
  max-width: 1200px; 
  min-height: auto; 
  position: relative;
  box-sizing: border-box; 

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