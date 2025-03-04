import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onUser }) => {
  const [formData, setFormData] = useState({
    user: "",
    pass: "",
  });

  const onInputChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onUser( formData )    
  };

  return (
    
    <>
      <div className="background-container-login">
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <section className="col-6 d-flex justify-content-center">
              <div className="row">
                <div className="col">
                  <div className="d-flex justify-content-center">
                    <h1 className="h1" style={{ fontWeight: 700, fontSize: "80px", textShadow: "5px 5px 7px rgba(0, 0, 0, 0.5)" }}>
                      HSEQ.doc
                    </h1>
                  </div>
                  <div id="tittle-component" className="text-center">
                    <h2>Inicio de Sesión</h2>
                  </div>
                  <div id="form">
                    <form className="form-control" onSubmit={onSubmit}>
                      <div className="mb-3">
                        <label htmlFor="user" className="form-label"> Usuario </label>
                        <input type="email" className="form-control" id="user" placeholder="name@example.com" value={formData.user} onChange={onInputChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="pass" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="pass" placeholder="**********" value={formData.pass} onChange={onInputChange} />
                      </div>
                      <div className="d-grid gap-2 col-6 mx-auto">
                        <button id="login" className="btn btn-primary rounded-5" type="submit">
                          Ingresar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
