
import React, {useEffect} from "react"
import useAuthStorage from '../hooks/useAuthStorage';

const LoginContol = ({credential, onResponse}) => {

  const { saveAuthData } = useAuthStorage();
  const { user: email, pass: password } = credential;

  console.log(email, password);

  useEffect(() => {
    if (!credential?.user || !credential?.pass) {
      onResponse({ success: false, error: 'Credenciales incompletas' });
      return;
    }

    const controller = new AbortController();

    const handleLogin = async () => {
      try {

        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), 
            signal: controller.signal   
        });

        if (!response.ok) {
          throw new Error('Credenciales inválidas');
        }

        if (response.ok) {
          const data = await response.json();
          saveAuthData({
            token: data.token,
            userId: data.user.id,
            userName: data.person.name,
            lastName: data.person.last_name
          });
          onResponse({ success: true, data });
        } else {
          throw new Error('Falló al almacenar el token');
        }

      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error de autenticación:", err);
          window.localStorage.removeItem('token');
          onResponse({ 
            success: false, 
            error: err.message,
            storedToken: window.localStorage.getItem('token')
          });
        }
      }
    };
    
    handleLogin();
    return () => controller.abort();

  }, [email, password, onResponse]); 

  
  return null; 
}

export default LoginContol
