import React, { useState } from 'react'
import NavBarApp from '@/components/navBarComponent/NavBarApp';
import styled from 'styled-components'
import Table2App from '@/components/tableComponent/Table2App';

const InspectionApp = () => {
  const [isOpen, setIsOpen] = useState(false);  

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  const datosTabla = {
    titulo: "Inventario de Productos",
    encabezados: ["ID", "Producto", "Stock", "Precio"],
    valores: [
      [1, "Laptop HP", 15, "$1200"],
      [2, "Teclado mecánico", 42, "$85"],
      [3, "Monitor 24\"", 8, "$350"],
      [4, "Mouse inalámbrico", 36, "$25"]
    ]
  };

  return (
    <Container>
      <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen}>
        <Title>Inspección de Herramientas</Title>
        <ContentForm>
          <Table2App data={datosTabla} />
          <Table2App 
            data={{
              titulo: "Usuarios Registrados",
              encabezados: ["Nombre", "Email", "Rol"],
              valores: [
                ["Juan Pérez", "juan@example.com", "Admin"],
                ["María García", "maria@example.com", "Usuario"]
              ]
            }} 
          />
        </ContentForm>
      </Content>
    </Container>
  )
}

export default InspectionApp

const ContentForm = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 20px auto;
  padding: 20px;
  width: 90%;
  max-width: 1200px;
  min-height: auto;
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  box-sizing: border-box;
`;

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