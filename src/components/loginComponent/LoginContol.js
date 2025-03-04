
import useEffect from "react"

const LoginContol = ({credential, onResponse}) => {

  const { user: email, pass: password } = credential;


  const handleLogin = async () => {
      try {
          const response = await fetch('http://127.0.0.1:8000/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }), 
          });

          if (!response.ok) {
              throw new Error('Credenciales inválidas');
          }

          const data = await response.json();

          onResponse({ success: true, data });
      } catch (error) {
          onResponse({ success: false, error: error.message });
      }
  };
  
  handleLogin();
  
  return null; 
}

export default LoginContol
