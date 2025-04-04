import React, { useCallback, useState } from 'react'
import DeleteUserControl from './DeleteUserControl';
import ModalApp from '../../modalComponent/ModalApp';
import styled from 'styled-components';
import ToastApp from '../../toastComponent/ToastApp';

const DeleteUserApp = ({stateModal, setStateModal, userDelete, onRefresh}) => {

  const [user, setUser] = useState();
  const [toast, setToast] = useState(null);

  const handleDelete = () => {        
    if (userDelete) {
      setUser(userDelete.id);
      setStateModal(false);
    }
  }

  const onResponseControl = useCallback ((response) =>{
    const { message, person, status } = response;

    console.log("message: ", message);

    if (message === "Persona eliminada correctamente") {
      setToast({type:"success", message:"¡Ususario eliminado correctamente!", duration:"5000"});
      
      if (onRefresh) {
        onRefresh();
      }

    } else if(message === "Error al eliminar persona") {
      setToast({type:"error", message: message, duration:"5000"});
    }

  }, []);

  return (
    <>
        {userDelete && 
            <ModalApp
                state = {stateModal}
                setState = {setStateModal}
                tittle = {"Eliminar"}
                viewHeader = {true}
                viewOverlay = {true}
                modalPosition = {'center'}
                customPadding = {'20px'}    
                colorText = {'#ffffff'}
                headerColor = {'rgba(255, 0, 0, 0.8)'}
            >
                <ContentDelete>
                    <h2>Eliminar Usuario</h2>
                    <p>{`¿Esta seguro que desea eliminar el usuario ${userDelete.doc} ?`}</p>
                    <ContentBtn>
                        <StyledButton onClick = { () => setStateModal(false) }> NO </StyledButton>
                        <StyledButton2 onClick={handleDelete}>SI</StyledButton2>
                    </ContentBtn>
                </ContentDelete>
            </ModalApp> 
        } 
        {user && <DeleteUserControl user = {user} onResponse = {onResponseControl} />}   
        {toast && (
            <ToastApp
                key={toast.type + toast.message}
                type={toast.type}
                message={toast.message}
                duration={3000}
            />
        )} 
    </>
  )
}

export default DeleteUserApp

const ContentBtn = styled.div`
    display: flex;
    gap: 16px; 
    justify-content: center; 
`;

const StyledButton = styled.button`
  background-color: #ff0000d6;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  font-family: Helvetica, sans-serif;
  color: white;
  width: 100%;
  max-width: 200px;
  min-width: 50px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c80000;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledButton2 = styled.button`
  background: #099447;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  font-family: Helvetica, sans-serif;
  color: white;
  width: 100%;
  max-width: 200px;
  min-width: 50px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: #06612f;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const ContentDelete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2{
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #202020;
    text-shadow: none;
  }

  p{
    font-size: 18px;
    margin-bottom: 10px;
  }
`;