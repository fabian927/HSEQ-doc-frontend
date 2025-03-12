import { useEffect, useState } from "react"
import Login from "./Login"
import LoginControl from "./LoginContol"
import ToastApp from "../toastComponent/ToastApp";
import useValidateObject from "../hooks/useValidateObject";

const LoginApp = ({ onLoginSuccess }) => {

    const [user, setUser] = useState(null);
    const [toast, setToast] = useState(null);    
    const [isSubmitting, setIsSubmitting] = useState(false); 
    

    const { isValidObject } = useValidateObject();

    const onDataUser = (dataUser) => {
      setToast({type:"loading", message: "Validando..."});
      if (isValidObject(dataUser)) {
          setUser(dataUser);
          setIsSubmitting(true);
      } else {
        console.log("El objeto tiene valores inválidos");
      }
    }

    const onResponse = async (response) => {
        console.log("response login", response);
        const { success } = await response; 
        if (success) {
          onLoginSuccess(); 
        }
        setIsSubmitting(false);
        setToast({type:"error", message: response.error});
    };
    

    useEffect(() => {

    }, [user]);

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
          duration={3000}
        />
      )}

    </>
  )
}

export default LoginApp
