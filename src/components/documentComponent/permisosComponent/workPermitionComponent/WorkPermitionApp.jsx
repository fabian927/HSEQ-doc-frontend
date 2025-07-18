import React, { useState } from 'react'
import NavBarApp from '@/components/navBarComponent/NavBarApp';
import styled from 'styled-components'

const WorkPermitionApp = () => {
  const [isOpen, setIsOpen] = useState(false);  

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <Container>
      <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen}>
        <Title>Permiso de Trabajo</Title>
      </Content>
    </Container>
  )
}

export default WorkPermitionApp

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