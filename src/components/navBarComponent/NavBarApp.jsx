import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SidebarApp from '../sideBarComponent/SideBArApp';
import BurguerButton from '../burguerComponent/BurguerButton';

const NavBarApp = ({isOpen, setIsOpen, onToggle}) => {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const [roll, setRoll] = useState(null);

    useEffect(() => {
        const storedRoll = localStorage.getItem("roll");
        setRoll(storedRoll);
    }, []);


    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
        window.location.href = '/login';
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 768) {
                setClicked(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <NavContainer>
                <Logo onClick={() => onToggle()}>HSEQ.DOC</Logo>
                
                <NavLinks className={`${clicked ? 'active' : ''}`}>
                    <NavLink to="/" onClick={handleClick}>Home</NavLink>                    
                    {roll === "1" && (<NavLink to="/users" onClick={handleClick}>Usuarios</NavLink>)}
                    <NavLink to="/documents" onClick={handleClick}>Documentos</NavLink>
                    <NavLink to="/reports" onClick={handleClick}>Reportes</NavLink>
                    <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
                </NavLinks>
                
                <MenuButton className='burguerButton'>
                    <BurguerButton clicked={clicked} handleClick={handleClick} />
                </MenuButton>
                
                <MenuBackground className={`initial ${clicked ? 'active' : ''}`} />

            </NavContainer>
            <SidebarApp isOpen={isOpen}/>

        </>
        
    );
}

export default NavBarApp;

const NavContainer = styled.nav`
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 60px; 
    padding: 0 2rem; 
    background-color: #2c3e50; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
    z-index: 1000; 
`;

const Logo = styled.h2`
    color: #fff;
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        color: #3498db; 
    }
`;

const NavLinks = styled.div`
    position: fixed;
    top: 70px; 
    left: 0;
    width: 100%;
    background-color: #34495e; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 70px); 
    transform: translateX(-100%); 
    transition: transform 0.4s ease-in-out;
    z-index: 999;
    
    @media (min-width: 768px) {
        position: static;
        width: auto;
        height: auto;
        background-color: transparent;
        flex-direction: row;
        transform: none;
        transition: none;
    }
    
    
    &.active {
        transform: translateX(0); 
    }
`;

const NavLink = styled(Link)`
    color: #ecf0f1;
    text-decoration: none;
    font-size: 1.2rem;
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
        color: #3498db;
    }
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: #3498db;
        transition: all 0.3s ease;
        transform: translateX(-50%);
    }
    
    &:hover::after {
        width: 80%;
    }
    
    @media (min-width: 768px) {
        font-size: 1rem;
        margin: 0 0.8rem;
        
        &::after {
            bottom: -5px;
        }
    }
`;

const LogoutButton = styled.button`
    background: #e74c3c; 
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.6rem 1.2rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    
    &:hover {
        background: #c0392b; 
        transform: translateY(-2px);
    }
    
    @media (min-width: 768px) {
        margin-top: 0;
        margin-left: 1rem;
        font-size: 0.9rem;
        padding: 0.4rem 0.8rem;
    }
`;

const MenuButton = styled.div`
    display: block;
    z-index: 1000;
    
    @media (min-width: 768px) {
        display: none;
    }
`;

const MenuBackground = styled.div`
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: rgba(0, 0, 0, 0.7); 
    backdrop-filter: blur(5px); 
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
    
    &.active {
        opacity: 1;
        pointer-events: all;
    }
    
    @media (min-width: 768px) {
        display: none;
    }
`;