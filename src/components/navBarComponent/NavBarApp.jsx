import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import BurguerButton from '../burguerComponent/BurguerButton'

const NavBarApp = () => {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setClicked(!clicked);
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
            <h2> HSEQ.Doc </h2>
            <div className={`links ${clicked ? 'active' : ''}`}>
              <Link to="/" onClick={handleClick}>
                Home
              </Link>
              <Link to="/users" onClick={handleClick}>
                Usuarios
              </Link>
              <Link to="/documents" onClick={handleClick}>
                Documentos
              </Link>
              <Link to="/reports" onClick={handleClick}>
                Reportes
              </Link>
              <a onClick={handleClick} href="../loginComponent/LoginApp">Cerrar Sesión</a>
            </div>
            <div className='burguerButton'>
                <BurguerButton clicked = {clicked} handleClick = {handleClick} />
            </div>
            <BigDiv className={`initial ${clicked ? ' active' : ''}`}></BigDiv>
        </NavContainer>      
    </>
  )
}

export default NavBarApp

const NavContainer = styled.nav`
h2{
    color: #333;
    font-weight: 100;
}
padding: .4rem;
background-color: #333;
display: flex;
align-items: center;
justify-content: space-between;
a{
    color: white;
    text-decoration: none;
    margin-right: 1rem;
}
.links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all .5s ease;
    a{
      color: white;
      font-size: 2rem;
      display: block;
    }
    @media(min-width: 768px){
      position: initial;
      margin: 0;
      a{
        font-size: 1rem;
        color: white;
        display: inline;
      }
      display: block;
    }
}
.links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
    a{
        font-size: 1.5rem;
        color: white;
    }
}
.burguerButton{
    @media(min-width: 768px){
        display: none;
    }

}
`
const BigDiv = styled.div`

background-color: #222;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease ;

  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`