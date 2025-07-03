import { useCallback, useEffect, useState } from "react";
import Login from "./Login"
import LoginControl from "./LoginContol"
import ToastApp from "../toastComponent/ToastApp";
import useValidateObject from "../hooks/useValidateObject";

const LoginApp = ({ onLoginSuccess }) => {

    const [user, setUser] = useState(null);
    const [toast, setToast] = useState(null);    
    const [isSubmitting, setIsSubmitting] = useState(false); 
    

    const { isValidObject } = useValidateObject();

    const onDataUser = useCallback ((dataUser) => {
      if (isValidObject(dataUser)) {
        setToast({type:"loading", message: "Validando..."});
        setUser(dataUser);
        setIsSubmitting(true);
      } else {
        setToast({type:"error", message: "Datos inválidos"});
      }
    }, [isValidObject]);

    const onResponse = useCallback(async (response) => {
      //console.log("response login", response);
      if (response.success) {
        onLoginSuccess(); 
        setToast(null);
      } else {
        setToast({type:"error", message: response.error || "Error en el login"});
      }
      setIsSubmitting(false);
      setUser(null);
    }, [onLoginSuccess]);    

    useEffect(() => {
      return () => {
        setIsSubmitting(false);
        setUser(null);
      };
    }, []);

  return (
    <>

      <Login onUser={onDataUser} />
      {isSubmitting && user && (
        <LoginControl credential={user} onResponse={onResponse} />
      )}

      {toast && (
        <ToastApp
          key={toast.type + toast.message}
          type={toast.type}
          message={toast.message}
          position="center"
          duration={3000}
        />
      )}

    </>
  )
}

export default LoginApp
