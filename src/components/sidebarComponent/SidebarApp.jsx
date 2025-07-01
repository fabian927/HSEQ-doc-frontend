import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaFileAlt, FaChartBar, FaBars, FaChevronDown, FaChevronRight, FaUser } from "react-icons/fa";

const SidebarApp = ({ isOpen }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({
    users: false,
    documents: false,
    reports: false
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    
    {
      label: "Usuarios",
      icon: <FaUsers />,
      subItems: [
        { path: "/users", label: "Listar Usuarios" },
        { path: "/users/create", label: "Crear Usuario" }
      ]
    },
     {
      label: "Permisos",
      icon: <FaFileAlt />,
      subItems: [
        { label: "Trabajo", path: "/documents/workPermition" },
        { label: "Trabajo en Alturas", path: "/documents/workAlturas" },
        { label: "Trabajo en Caliente", path: "/documents/permission2" },
        { label: "Trabajo Eléctrico", path: "/documents/permission3" },
        { label: "Espacios Confinados", path: "/documents/permission4" }
      ]
    },
    {
      label: "Documentos",
      icon: <FaFileAlt />,
      subItems: [
        { label: "Inspección de Herramienta", path: "/documents/inspection" },
        { label: "Herramientas Eléctricas", path: "/documents/document2" },
        { label: "Equipos de Altura", path: "/documents/document3" },
        { label: "Llamado de Atención", path: "/documents/document4" }
      ]
    },
    {
      label: "ATS",
      icon: <FaFileAlt />,
      subItems: [
        { label: "Trabajo Seguro", path: "/documents/ats" },
        { label: "Alturas", path: "/documents/ats2" },
        { label: "Espacios Confinados", path: "/documents/ats3" }
      ]
    },
    {
      label: "Reportes",
      icon: <FaChartBar />,
      subItems: [
        { path: "/reports", label: "Buscar Reportes" }
      ]
    }
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <User>
        <FaUser />
        {isOpen && <span>{localStorage.getItem("userName")}</span>}
      </User>
      <SidebarNav>
        {menuItems.map((item, index) => {
          const isExpanded = expandedMenus[item.label?.toLowerCase()];
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const menuKey = item.label?.toLowerCase();

          return (
            <React.Fragment key={index}>
              {item.path ? (
                <SidebarLink
                  to={item.path}
                  active={location.pathname === item.path ? "true" : undefined}
                >
                  <IconWrapper isOpen={isOpen}>{item.icon}</IconWrapper>
                  {isOpen && <LinkLabel>{item.label}</LinkLabel>}
                </SidebarLink>
              ) : (
                <>
                  <MenuHeader onClick={() => toggleMenu(menuKey)}>
                    <IconWrapper isOpen={isOpen}>{item.icon}</IconWrapper>
                    {isOpen && (
                      <>
                        <LinkLabel>{item.label}</LinkLabel>
                        <ChevronIcon>
                          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                        </ChevronIcon>
                      </>
                    )}
                  </MenuHeader>

                  <SubMenu isOpen={isExpanded && isOpen}>
                    {hasSubItems &&
                      item.subItems.map((subItem, subIndex) => (
                        <SidebarLink
                          key={subIndex}
                          to={subItem.path}
                          active={location.pathname === subItem.path ? "true" : undefined}
                        >
                          {isOpen && subItem.label}
                        </SidebarLink>
                      ))}
                  </SubMenu>
                </>
              )}
            </React.Fragment>
          );
        })}
      </SidebarNav>
    </SidebarContainer>
  );
};

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre ícono y texto */
  padding: 20px 30px;
  margin-top: 40px;
  color: white;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05); /* Fondo sutil */
`;


const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  width: ${({ isOpen }) => isOpen ? "250px" : "60px"};
  height: 100vh;
  background: #2c3e50; 
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999; /* Un poco menos que el NavBar */
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => isOpen ? 'flex-start' : 'center'};
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: none;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  flex-grow: 1;
  overflow-y: auto;
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #ecf0f1;
  font-weight: 500;

  &:hover {
    background-color: #34495e;
  }
`;

const SidebarLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ecf0f1;
  padding: 0.8rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 400;
  transition: all 0.3s ease;
  position: relative;
  margin-left: ${({ isOpen }) => isOpen ? '0' : '0.5rem'};

  &:hover {
    background-color: #34495e;
  }

  ${({ active }) => active && css`
    background-color: #3498db;
    color: white;
    
    &:hover {
      background-color: #2980b9;
    }
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: white;
    }
  `}
`;

const SubMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  flex-direction: column;
  max-height: none;
  overflow: visible;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.1);
  padding-left: 1rem;
`;

const IconWrapper = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  font-size: 1.1rem;
  margin-right: ${({ isOpen }) => isOpen ? '12px' : '0'};
`;

const LinkLabel = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChevronIcon = styled.span`
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  margin-left: auto;
`;

export default SidebarApp;