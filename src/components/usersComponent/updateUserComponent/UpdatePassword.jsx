import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Formik, Form, Field  } from 'formik';
import * as Yup from 'yup';
import {useUpdatePass} from './UpdatePassControl';
import ToastApp from '@/components/toastComponent/ToastApp';

const UpdatePassword = () => {
  const [toast, setToast] = useState(null);
  
  const updatePass = useUpdatePass();

  const validationSchema = Yup.object().shape({
    pass: Yup.string().required('Campo obligatorio'),
    newPass: Yup.string()
    .min(8, 'Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe tener al menos una letra mayúscula')
    .matches(/\d/, 'Debe tener al menos un número')
    .required('Campo obligatorio'),
    confirmPass: Yup.string()
    .oneOf([Yup.ref('newPass'), null], 'Las contraseñas no coinciden')
    .required('Campo obligatorio'),
    // Agrega más validaciones según necesites
  });
  
  return (
    <ContentForm>
      <Title2>Cambiar contraseña</Title2>
      <BodyForm>
        <Formik
          initialValues={{
            pass: '',
            newPass: '',
            confirmPass: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async  (values, { setSubmitting, resetForm }) => {

            await updatePass(values, (response) => {
              if (response.success) {
                setToast({type:"success", message:"¡Contraseña actualizada!", duration:"3000"});
                resetForm();
              } else {
                setToast({type:"error", message: response.error});
              }
            });
            
            setSubmitting(false);
          }}              
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form>
              <div>
                <Label htmlFor="pass">Contraseña actual *</Label>
                <StyledField 
                  id="pass" 
                  name="pass" 
                  type="password"
                  placeholder="********" 
                />
                {errors.pass && touched.pass && (
                  <ErrorMessage>{errors.pass}</ErrorMessage>
                )}
              </div> 
              <div>
                <Label htmlFor="newPass">Contraseña Nueva *</Label>
                <StyledField 
                  id="newPass" 
                  name="newPass" 
                  type="password"
                  placeholder="********" 
                />
                {errors.newPass && touched.newPass && (
                  <ErrorMessage>{errors.newPass}</ErrorMessage>
                )}
              </div>  
              <div>
                <Label htmlFor="confirmPass">Confirmar contraseña *</Label>
                <StyledField 
                  id="confirmPass" 
                  name="confirmPass" 
                  type="password"
                  placeholder="********" 
                />
                {errors.confirmPass && touched.confirmPass && (
                  <ErrorMessage>{errors.confirmPass}</ErrorMessage>
                )}
              </div> 
              <ButtonContent>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </Button> 
              </ButtonContent>                                 
            </Form>
          )}              
        </Formik>
        {toast && (
          <ToastApp
            key={toast.type + toast.message}
            type={toast.type}
            message={toast.message}
            duration={5000}
          />
        )}
      </BodyForm>
    </ContentForm>        
  )
}

export default UpdatePassword

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
  width: 35%; /* Porcentaje en lugar de fixed width */
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