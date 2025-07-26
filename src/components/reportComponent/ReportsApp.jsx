import NavBarApp from '../navBarComponent/NavBarApp';
import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import TableReports from '../tableComponent/TableReports';
import { useGetAts } from './GetAtsReport'; 
import { generarPDF } from './pdfComponent/AtsPdfTemplate';

const ReportsApp = () => {
  const [isOpen, setIsOpen] = useState(true);  
  const [ats, setAts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const { getAtsReport } = useGetAts();

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  const columnas = [
    {
      name: 'Responsable',
      selector: row => row.responsable,
    },
    {
      name: 'Proyecto',
      selector: row => row.proyecto,
    },
    {
      name: 'Actividad',
      selector: row => row.actividad,
    },
    {
      name: 'Fecha inicio',
      selector: row => row.fecha,
    },
    {
      name: 'Ejecutor',
      selector: row => row.ejecutor,
    },
  ];

 useEffect(() => {
    const userId = localStorage.getItem('userId');
    setLoading(true); 

    getAtsReport(userId, (response) => {
      setTimeout(() => {
        if (response.status) {
          setAts(response.data);
          setError("");
        } else {
          setError(response.error || "No se pudieron cargar los datos");
        }
        setLoading(false); 
      }, 3000); 
    });
  }, [getAtsReport]);

  return (
    <Container>
      <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen} >
        <Title>Reportes</Title>
        {loading ? (
          <p style={{ color: "white", textAlign: "center" }}>Cargando datos...</p>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : (
          <TableReports
            title="Reportes ATS"
            data={ats}
            columns={columnas}
            onRowClick={generarPDF}
          />
        )}
      </Content>
    </Container>
  );
}

export default ReportsApp

const Button = styled.button`
  margin: 1rem auto;
  display: block;
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url('/image/home-image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

`;
const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 3rem;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})(({ isOpen }) => `
  flex: 1;
  padding: 10px;
  margin-left: ${isOpen ? "250px" : "60px"};
  transition: margin-left 0.3s ease;
  
  h1 {
    text-align: center;
    color: white;
    font-size: 3rem;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
  }
`);
