import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaFileAlt, FaChartBar, FaBars, FaChevronDown, FaChevronRight } from "react-icons/fa";

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
      path: "/",
      icon: <FaHome />,
      label: "Home",
      exact: true
    },
    {
      label: "Usuarios",
      icon: <FaUsers />,
      subItems: [
        { path: "/users", label: "Listar Usuarios" },
        { path: "/users/create", label: "Crear Usuario" }
      ]
    },
    {
      label: "Documentos",
      icon: <FaFileAlt />,
      subItems: [
        { path: "/documentos/permisos", label: "Permisos" },
        { path: "/documentos/documentos", label: "Documentos" },
        { path: "/documentos/ats", label: "ATS" }
      ]
    },
    {
      label: "Reportes",
      icon: <FaChartBar />,
      subItems: [
        { path: "/reportes/buscar", label: "Buscar Reportes" }
      ]
    }
  ];

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarNav>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.path ? (
              <SidebarLink 
                to={item.path} 
                active={location.pathname === item.path ? "true" : undefined}
              >
                <IconWrapper>{item.icon}</IconWrapper>
                {isOpen && (
                  <>
                    <LinkLabel>{item.label}</LinkLabel>
                    {item.subItems && (
                      <ChevronIcon>
                        {expandedMenus[item.label.toLowerCase()] ? <FaChevronDown /> : <FaChevronRight />}
                      </ChevronIcon>
                    )}
                  </>
                )}
              </SidebarLink>
            ) : (
              <>
                <MenuHeader onClick={() => toggleMenu(item.label.toLowerCase())}>
                  <IconWrapper>{item.icon}</IconWrapper>
                  {isOpen && (
                    <>
                      <LinkLabel>{item.label}</LinkLabel>
                      <ChevronIcon>
                        {expandedMenus[item.label.toLowerCase()] ? <FaChevronDown /> : <FaChevronRight />}
                      </ChevronIcon>
                    </>
                  )}
                </MenuHeader>
                <SubMenu isOpen={expandedMenus[item.label.toLowerCase()] && isOpen}>
                  {item.subItems?.map((subItem, subIndex) => (
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
        ))}
      </SidebarNav>
    </SidebarContainer>
  );
};

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
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.1);
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