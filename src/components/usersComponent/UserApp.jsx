import NavBarApp from '../navBarComponent/NavBarApp';
import React, { useState } from "react";
import styled from 'styled-components';
import ListUserApp from './listUserComponent/ListUserApp';
import CreateUserApp from './createUserComponent/CreateUserApp';
import UpdateUserApp from './updateUserComponent/UpdateUserApp';
import UpdatePassword from './updateUserComponent/UpdatePassword';
import { Routes, Route } from 'react-router-dom';

const UserApp = () => {
  const [isOpen, setIsOpen] = useState(false);  

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <Container>
      <NavBarApp isOpen={isOpen} setIsOpen={setIsOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen} >
        <Title>Usuarios</Title>
        <Routes>
          <Route path="/" element={<ListUserApp />} /> 
          <Route path="/create" element={<CreateUserApp />} />
          <Route path="/update" element={<UpdateUserApp />} />
          <Route path="/updtPass" element={<UpdatePassword />} />
        </Routes>
      </Content>
    </Container>
  );
};

export default UserApp

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
