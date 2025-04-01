import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaFileAlt, FaChartBar, FaBars } from "react-icons/fa";

const SidebarApp = ({ isOpen, onToggle }) => {
  
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [docsMenuOpen, setDocsMenuOpen] = useState(false);
  const [reportsMenuOpen, setReportsMenuOpen] = useState(false);

  const MenuHeader = ({ children, onClick }) => {
    return <MenuHeaderContainer onClick={onClick}>{children}</MenuHeaderContainer>;
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleButton onClick={onToggle}>
        <FaBars/>
      </ToggleButton>

      <SidebarLink to="/">
        <FaHome /> {isOpen && " Home"}
      </SidebarLink>

      <MenuHeader onClick={() => setUserMenuOpen(!userMenuOpen)}>
        <FaUsers /> {isOpen && " Usuarios"}
      </MenuHeader>
      <SubMenu isOpen={userMenuOpen}>
        <SidebarLink to="/users">{isOpen && "Listar Usuarios"}</SidebarLink>
        <SidebarLink to="/users/create">{isOpen && "Crear Usuario"}</SidebarLink>
      </SubMenu>

      <MenuHeader onClick={() => setDocsMenuOpen(!docsMenuOpen)}>
        <FaFileAlt /> {isOpen && " Documentos"}
      </MenuHeader>
      <SubMenu isOpen={docsMenuOpen}>
        <SidebarLink to="/documentos/permisos">{isOpen && "Permisos"}</SidebarLink>
        <SidebarLink to="/documentos/documentos">{isOpen && "Documentos"}</SidebarLink>
        <SidebarLink to="/documentos/ats">{isOpen && "ATS"}</SidebarLink>
      </SubMenu>

      <MenuHeader onClick={() => setReportsMenuOpen(!reportsMenuOpen)}>
        <FaChartBar /> {isOpen && " Reportes"}
      </MenuHeader>
      <SubMenu isOpen={reportsMenuOpen}>
        <SidebarLink to="/reportes/buscar">{isOpen && "Buscar"}</SidebarLink>
      </SubMenu>
    </SidebarContainer>
  );
};

const MenuHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #222;
  }
`;

const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  width: ${(props) => (props.isOpen ? "250px" : "60px")};
  height: 100vh;
  background: #333;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  position: fixed;
  top: 0;
  left: 0;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  text-align: left;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 10px;
  font-size: 18px;
  gap: 10px;
  &:hover {
    background: #555;
  }
`;

const SubMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding-left: 20px;
`;

export default SidebarApp;