import { Routes, Route, useNavigate } from "react-router-dom";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeApp = ({ onLogout }) => {

    const navigate = useNavigate();

  return (
    <>
      <div className="background-container-home">
          <div className="row mt-5 justify-content-center">
              <section className="col-6 d-flex justify-content-center">
                  <div className="row">
                      <div className="col">
                          <div className="d-flex text-center">
                              <h1 className="h1" style= {{ fontWeight: 700, fontSize: "60px", textShadow: "5px 5px 7px rgba(0, 0, 0, 0.5)" }} >
                                  Bienvenidos a HSEQ.doc
                              </h1>
                          </div>
                      </div>
                  </div>
              </section>
              <div id="columns-group" className="container text-center">
                  <div className="row align-items-center">
                      <div className="col">
                          <button 
                              id="user" 
                              type="button" 
                              className="btn btn-outline-light icon-button"
                              onClick={() => navigate('/users')}
                          >
                              <img src= "/image/icon-user.png" alt="icon-user" className="icon-img"/>
                          </button>
                          <p>Usuarios</p>
                      </div>
                      <div className="col">
                          <button 
                              id="documents" 
                              type="button" 
                              className="btn btn-outline-light icon-button"
                              onClick={() => navigate('/documents')}
                          >
                              <img src="/image/icon-doc.png" alt="icon-doc" className="icon-img"/>
                          </button>
                          <p>Documentos</p>
                      </div>
                      <div className="col">
                          <button 
                              id="reports" 
                              type="button" 
                              className="btn btn-outline-light icon-button"
                              onClick={() => navigate('/reports')}
                          >
                              <img src="/image/icon-pdf.png" alt="icon-pdf" className="icon-img"/>
                          </button>
                          <p>Reportes</p>
                      </div>
                  </div>
              </div>
          </div>         
      </div>   
    </>
  )
}

export default HomeApp
