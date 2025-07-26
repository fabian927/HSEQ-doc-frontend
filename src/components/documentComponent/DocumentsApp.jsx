import { Outlet, useNavigate } from 'react-router-dom';
import NavBarApp from '../navBarComponent/NavBarApp';
import React, { useState } from "react";
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

const DocumentsApp = () => {
  const [isOpen, setIsOpen] = useState(true);  
  const navigate = useNavigate(); 

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = [
    {
      title: "Permisos",
      icon: "/image/icon-doc.png", 
      buttons: [
        { label: "Trabajo en Alturas", path: "workPermitionHeights" },
        { label: "Trabajo en Caliente", path: "/permission2" },
        { label: "Trabajo Electrico", path: "/permission3" },
        { label: "Espacios Confinados", path: "/permission4" }
      ]
    },
    {
      title: "Documentos",
      icon: "/image/icon-doc.png",
      buttons: [
        { label: "Inspección de Herramienta", path: "inspection" },
        { label: "Inspección de Herramientas Electricas", path: "/document2" },
        { label: "Inspección de Equipos de Altura", path: "/document3" },
        { label: "LLamado de Atención", path: "/document4" }
      ]
    },
    {
      title: "ATS",
      icon: "/image/icon-doc.png",
      buttons: [
        { label: "Analisis de Trabajo Seguro", path: "ats" },
        { label: "Analisis de Trabajo Seguro en Alturas", path: "/ats2" },
        { label: "Analisis de Trabajo Seguro Espacios Confinados", path: "/ats3" },
      ]
    }
  ];

  return (
    <Container>
      <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen}>
        <Title>Documentos</Title>
        <ColumnsContainer>
          {columns.map((column, index) => (
            <Column key={index}>
              <ColumnHeader>
                <HeaderIcon src={column.icon} alt={`icon-${column.title}`} />
                <ColumnTitle>{column.title}</ColumnTitle>
              </ColumnHeader>
              <ButtonList>
                {column.buttons.map((button, btnIndex) => (
                  <StyledButton 
                    key={btnIndex} 
                    onClick={() => navigate(button.path)}
                  >
                    <ButtonLabel>{button.label}</ButtonLabel>
                  </StyledButton>
                ))}
              </ButtonList>
            </Column>
          ))}
        </ColumnsContainer>
      </Content>
    </Container>
  );
}

export default DocumentsApp;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url('/image/home-image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  flex: 1;
  padding: 20px;
  margin-left: ${({ isOpen }) => isOpen ? "250px" : "60px"};
  transition: margin-left 0.3s ease;
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

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Column = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const HeaderIcon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const ColumnTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
  }
`;

const ButtonLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;