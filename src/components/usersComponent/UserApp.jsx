import NavBarApp from '../navBarComponent/NavBarApp';
import SidebarApp from '../sidebarComponent/SidebarApp';
import React, { useState } from "react";
import styled from 'styled-components';
import ListUserApp from './listUserComponent/ListUserApp';
import CreateUserApp from './createUserComponent/CreateUserApp';
import { Routes, Route } from 'react-router-dom';

const UserApp = () => {
  const [isOpen, setIsOpen] = useState(false);  

  const handleToggle = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <Container>
      <NavBarApp />
      <SidebarApp isOpen={isOpen} onToggle={handleToggle}/>
      <Content isOpen={isOpen} >
        <h1>Usuarios</h1>
        <Routes>
          <Route path="/" element={<ListUserApp />} /> 
          <Route path="/create" element={<CreateUserApp />} />
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
`

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
