import React, {useState, useCallback} from 'react'
import styled from 'styled-components';
import FormCreateUser from '../formCreatecomponent/FormCreateUser';
import useValidateObject from '../../hooks/useValidateObject';
import CreateUserControl from './CreateUserControl';

const CreateUserApp = () => {

    const [dataForm, setDataForm] = useState({});

    const { isValidObject } = useValidateObject();


    const onDataForm = useCallback((userData) => {
      if (isValidObject(userData)) {
        setDataForm((prevData) => ({ ...prevData, ...userData }));
      }else{
        console.log("El objeto tiene valores inválidos");
      }        
    }, []);

    const onResponse = useCallback((response) => {
        const { success, data } = response;
        if (success) {
          console.log("onResponse Create", data); 
          setDataForm({});
        } else {
          console.error("Error en la respuesta:", response.error);
        }
      }, []);
    

  return (
    <Container>
        <FormCreateUser onDataForm = {onDataForm} />
        <CreateUserControl data={dataForm} onResponse={onResponse} />
    </Container>
  )
}

export default CreateUserApp

const Container = styled.div`
place-items: center;
`;