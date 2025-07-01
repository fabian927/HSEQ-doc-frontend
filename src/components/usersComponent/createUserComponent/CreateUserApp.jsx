import React, {useState, useCallback} from 'react'
import styled from 'styled-components';
import FormCreateUser from '../formCreatecomponent/FormCreateUser';
import useValidateObject from '../../hooks/useValidateObject';
import CreateUserControl from './CreateUserControl';
import ToastApp from '../../toastComponent/ToastApp';

const CreateUserApp = () => {

  const [dataForm, setDataForm] = useState({});
  const [validate, setValidate] = useState();
  const [toast, setToast] = useState(null);

  const { isValidObject } = useValidateObject();

  const onDataForm = useCallback((userData) => {
    if (isValidObject(userData)) {
      setDataForm((prevData) => ({ ...prevData, ...userData }));
    }else{
      setToast({type:"info", message: "El formulario tiene valores inválidos"});
    }        
  }, []);

  const onResponse = useCallback((response) => {
    const { success, data } = response;
    if (success) {
      console.log("success: ",success);
      setDataForm({});
      setValidate(true);
      setToast({type:"success", message:"¡Ususario creado correctamente!", duration:"3000"});
    } else {
      setValidate(false);
      setToast({type:"error", message: response.error});
    }
  }, []);
    

  return (
    <Container>
      <FormCreateUser onDataForm = {onDataForm} value = {validate} />
      <CreateUserControl data={dataForm} onResponse={onResponse} />
      {toast && (
        <ToastApp
          key={toast.type + toast.message}
          type={toast.type}
          message={toast.message}
          duration={3000}
        />
      )}
    </Container>
  )
}

export default CreateUserApp

const Container = styled.div`
place-items: center;
`;