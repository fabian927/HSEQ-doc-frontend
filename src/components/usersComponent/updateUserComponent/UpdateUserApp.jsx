import React, {useState, useCallback, useEffect} from 'react'
import FormCreateUser from '../formCreatecomponent/FormCreateUser';
import FilterUserControl from '../filterComponent/FilterUserControl';
import UpdateUserControl from '../updateUserComponent/UpdateUserControl';
import ToastApp from '../../toastComponent/ToastApp';
import ModalApp from '../../modalComponent/ModalApp';
import styled from 'styled-components';

const UpdateUserApp = ({user, stateModalUpdate, setStateModalUpdate, onRefresh}) => {
    const [userEdit, setUserEdit] = useState(user);
    const [userDataEdit, setUserdataEdit] = useState(null);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (user) {
            setUserEdit(user);
            console.log("desde update ", user);
        }
    }, [user]);

    const onResponseEdit = useCallback((response) => {
        const { success, data } = response;
        if (success) {
            setUserdataEdit(data);
        } else {
            console.error("Error en la respuesta:", response.error);
            setUserdataEdit(null);
        }
    }, []);

    const onResponseUpdate = useCallback((response) => {
        if (response) {
            setDataUpdate(response);
            setStateModalUpdate(false);
        } else {
            console.error("Error en la respuesta:", response.error);
            setDataUpdate(null);
        }
    }, []);

    const onResponseControl = useCallback ((response) =>{
        const { message, person, status } = response;

        if (message === "Persona actualizada correctamente") {
            setToast({type:"success", message:"¡Ususario actualizado correctamente!", duration:"5000"});

            if (onRefresh) {
                onRefresh();
            }

        } else if(message === "No se detectaron cambios para actualizar") {
            setToast({type:"info", message: message, duration:"5000"});

        }else{
            setToast({type:"error", message: message, duration:"5000"});
        }
    }, []);

  return (
    <>
        {user &&
            <ModalApp
                state = {stateModalUpdate}
                setState = {setStateModalUpdate}
                tittle = {""}
                viewHeader = {false}
                viewOverlay = {true}
                modalPosition = {'center'}
                customPadding = {'10px'} 
                widthContainer = {'800px'}
            >
                <ContentUpdate>
                    <FormCreateUser onDataEdit={userDataEdit} onDataForm = {onResponseUpdate} />
                </ContentUpdate>
            </ModalApp> 
        }
        <FilterUserControl dataFilter={userEdit} onResponse={onResponseEdit} />
        <UpdateUserControl user ={dataUpdate} onResponse={onResponseControl} />
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

export default UpdateUserApp

const ContentUpdate = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;