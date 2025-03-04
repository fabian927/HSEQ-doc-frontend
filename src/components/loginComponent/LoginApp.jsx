import { useEffect, useState } from "react"
import Login from "./Login"
import LoginControl from "./LoginContol"
import useValidateObject from "../hooks/useValidateObject";

const LoginApp = ({ onLoginSuccess }) => {

    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    

    const { isValidObject } = useValidateObject();

    const onDataUser = (dataUser) => {
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
    };
    

    useEffect(() => {

    }, [user]);

  return (
    <>

        <Login onUser={onDataUser} />
        {isSubmitting && user && (
            <LoginControl credential={user} onResponse={onResponse} />
        )}

    </>
  )
}

export default LoginApp
