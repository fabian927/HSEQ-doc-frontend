import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginApp from "./components/loginComponent/LoginApp";
import RoutesApp from "./components/routes/RoutesApp";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLogin, setIsLogin] = useState(false); 

  const handleLoginSuccess = () => {
    setIsLogin(true);
  };

  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isLogin ? <Navigate to="/" replace /> : <LoginApp onLoginSuccess={handleLoginSuccess} />
            }
          />
          <Route
            path="/*"
            element={
              isLogin ? <RoutesApp /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
