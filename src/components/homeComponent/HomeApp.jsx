import { Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import SliderApp from "../sliderComponent/SliderApp";

const HomeApp = ({ onLogout }) => {
    const navigate = useNavigate();

    return (
        <>
            <Container>
                <SliderApp/>
                <ContentButton>
                    <Button id="user" type="button" className="btn btn-outline-light icon-button" onClick={() => navigate('/users')}>
                        <img src="/image/icon-user.png" alt="icon-user" className="icon-img"/>
                        <ButtonLabel>Usuarios</ButtonLabel>
                    </Button>
                    <Button id="documents" type="button" className="btn btn-outline-light icon-button" onClick={() => navigate('/documents')}>
                        <img src="/image/icon-doc.png" alt="icon-doc" className="icon-img"/>
                        <ButtonLabel>Documentos</ButtonLabel>
                    </Button>
                    <Button id="reports" type="button" className="btn btn-outline-light icon-button" onClick={() => navigate('/reports')}>
                        <img src="/image/icon-pdf.png" alt="icon-pdf" className="icon-img"/>
                        <ButtonLabel>Reportes</ButtonLabel>
                    </Button>
                </ContentButton>
            </Container>      
        </>
    )
}

export default HomeApp

const Title = styled.h1`
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 60px;
    text-shadow: 5px 5px 7px rgba(0, 0, 0, 0.5);
    margin-bottom: 2rem;
`;

const Button = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-5px);
        background-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        
        .icon-img {
            transform: scale(1.1);
        }
    }
    
    .icon-img {
        width: 80px;
        height: 80px;
        margin-bottom: 15px;
        transition: all 0.3s ease;
    }
`;

const ButtonLabel = styled.p`
    font-size: 24px;
    font-weight: 500;
    color: #f8f9fa;
    margin: 0;
    transition: all 0.3s ease;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-image: url('/image/home-image.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; 
    padding-top: 100px;
    color: white;
`;

const ContentButton = styled.div`
    display: flex;
    justify-content: center;
    gap: 100px;
    align-items: center;
    padding: 50px;
    flex-wrap: wrap;
    max-width: 90%;
    margin: 0 auto;
`;