import React, {useEffect, useState} from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Table4App from '@/components/tableComponent/Table4App';
import CanvaApp from '@/components/canvaComponent/CanvaApp';
import ModalApp from '@/components/modalComponent/ModalApp';
import SelectFormApp from '@/components/formComponents/SelectFormApp';
import ToastApp from '@/components/toastComponent/ToastApp';
import {useResponsablesSubmit} from './ResponsablesControl';

const ResponsablesAts = ({id}) => {
  const [openModal, setOpenModal] = useState(false);
  const [firmaBase64, setFirmaBase64] = useState('');
  const [responsables, setResponsables] = useState([]);
  const [toast, setToast] = useState(null);

  const submitResponsables = useResponsablesSubmit();

  console.log('id desde responsable', id);
  
  const validationSchema = Yup.object().shape({
    nameResponsable: Yup.string().required('Campo obligatorio'),
  });

  const column = [
    "Nombre", "Responsable", "Firma"
  ];

  const handelSubmit = (data) => {
    console.log('click en el boton guardar responsables', data);
    submitResponsables(data, (res) => {
      if (res.success) {
        setToast({type:"success", message:"Respnssables guardados correctamente!", duration:"3000"});
      } else {
        setToast({type:"error", message: res.error});
      }
    });
  }

  return (
    <ContentForm>
      <Formik
        initialValues = {{
          nameResponsable: '',
          tipoResponsable: '',
          firma: '',
        }}
        validationSchema = {validationSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          const nuevoResponsable = {
            ...values,
            firma: firmaBase64,
            atsId: id,
          }

          setResponsables((prev) => [...prev, nuevoResponsable]);
          console.log('responsable que se agrego ', responsables);

          resetForm();
          setFirmaBase64('');
          setSubmitting(false);
        }}
      >
        {({values, errors, touched, isSubmitting, setFieldValue}) => (
          <Form>
            <SubTitle>Responsables ATS</SubTitle>
            <FormGrid>
              <div>
                <Label htmlFor="nameResponsable">Nombre</Label>
                <StyledField 
                id="nameResponsable" 
                name="nameResponsable" 
                placeholder="Nombre Completo" 
                />
                {errors.nameResponsable && touched.nameResponsable && (
                <ErrorMessage>{errors.nameResponsable}</ErrorMessage>
                )}
              </div>
              <div>
                <SelectFormApp
                name="tipoResponsable"
                label="Tipo responsable"
                options={[
                  { value: '', label: 'Seleccione una opción' },
                  { value: 'Responsable Trabajo', label: 'Responsable del trabajo' },
                  { value: 'Responsable Area', label: 'Responsable del área' },
                  { value: 'Verificacion', label: 'Verificación (Aleatoria)' }
                ]}
                />
              </div>

              <Button type="button" onClick={() => setOpenModal(true)}>
                Agregar Firma
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                Agregar Responsable
              </Button>
            </FormGrid>
            <ModalApp
              state = {openModal}
              setState = {setOpenModal}
              tittle = {"Firma"}
              viewHeader = {true}
              viewOverlay = {true}
              modalPosition = {'center'}
              customPadding = {'10px'} 
              widthContainer = {'600px'}
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

      {responsables.length > 0 && (
        <div>
          <Table4App
          headers={column}
          data={responsables.map(r => [
            r.nameResponsable,
            r.tipoResponsable,
            <img src={r.firma} alt="firma" style={{ height: '40px', width: '60px' }} />
          ])}
        />
        <Button type="button" 
         onClick={() => handelSubmit({ responsables })}
          disabled={responsables.length === 0}
        >
          Guargdar Responsable
        </Button>
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

export default ResponsablesAts

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


const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  max-height: min-content;

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