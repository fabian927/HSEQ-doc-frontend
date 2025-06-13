
import React, {useEffect} from "react"

const LoginContol = ({credential, onResponse}) => {

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

        const data = await response.json();
        const token = data.token;
        
        window.localStorage.removeItem('token');
        window.localStorage.setItem('token', token);

        const storedToken = window.localStorage.getItem('token');
        if (storedToken !== token) {
          throw new Error('Falló al almacenar el token');
        }

        onResponse({ success: true, data });
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
