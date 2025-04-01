import React, {useState, useCallback, useEffect} from 'react'
import FormCreateUser from '../formCreatecomponent/FormCreateUser';
import FilterUserControl from '../filterComponent/FilterUserControl';
import UpdateUserControl from '../updateUserComponent/UpdateUserControl';
import ToastApp from '../../toastComponent/ToastApp';

const UpdateUserApp = ({user, visible}) => {
    const [userEdit, setUserEdit] = useState(user);
    const [userDataEdit, setUserdataEdit] = useState(null);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [toast, setToast] = useState(null);
    const [visibleViews, setVisibleViews] = useState({
        table: false,
        form: false,
    });

    useEffect(() => {
        if (user) {
            setUserEdit(user);
            if (visible) {
                setVisibleViews(visible);
            }
        }
    }, [user, visible]);

    const onResponseEdit = useCallback((response) => {
        const { success, data } = response;
        if (success) {
            setUserdataEdit(data);
            setVisibleViews({ table: false, form: true });
        } else {
            console.error("Error en la respuesta:", response.error);
            setUserdataEdit(null);
            setVisibleViews({ table: true, form: false });
        }
    }, []);

    const onResponseUpdate = useCallback((response) => {
        if (response) {
            setDataUpdate(response);
        } else {
            console.error("Error en la respuesta:", response.error);
            setDataUpdate(null);
        }
    }, []);

    const onResponseControl = useCallback ((response) =>{
        const { message, person, status } = response;

        if (message === "Persona actualizada correctamente") {
            setToast({type:"success", message:"¡Ususario actualizado correctamente!", duration:"5000"});
        } else if(message === "No se detectaron cambios para actualizar") {
            setToast({type:"info", message: message, duration:"5000"});
        }else{
            setToast({type:"error", message: message, duration:"5000"});
        }
    }, []);

  return (
    <>
      {visibleViews.form && <FormCreateUser onDataEdit={userDataEdit} onDataForm = {onResponseUpdate} />}
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
