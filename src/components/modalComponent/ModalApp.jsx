import React from 'react'
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const ModalApp = ({
  children,
  state, 
  setState, 
  tittle = "Alerta!", 
  viewHeader, 
  viewOverlay, 
  modalPosition, 
  customPadding, 
  headerColor, 
  colorText,
  widthContainer,
}) => {

  return (
    <>
      {state && 
        <Overlay viewOverlay = {viewOverlay} modalPosition = {modalPosition} >
          <ContainerModal customPadding = {customPadding} widthContainer = {widthContainer} >
            {viewHeader && 
              <HeaderModal headerColor = {headerColor} colorText = {colorText} >
                <h3>{tittle}</h3>
              </HeaderModal>
            }            
            <CloseBtn onClick={() => setState(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </CloseBtn>  
            {children}          
          </ContainerModal>
        </Overlay>
      }      
    </>
  )
}

export default ModalApp

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "viewOverlay" &&
  prop !== "modalPosition",
})
(({viewOverlay, modalPosition}) => `
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${viewOverlay ? 'rgba(0, 0, 0, 0.5)' : 'transparent' };
  padding: 40px;
  display: flex;
  align-items: ${modalPosition ? modalPosition : 'center'};
  justify-content: center;
`);

const ContainerModal = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "customPadding" &&
  prop !== "widthContainer",
})
(({ customPadding, widthContainer }) => `
  width: ${widthContainer ? widthContainer : '500px'};
  min-height: 100px;
  background: #FFFF;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-bottom: ${customPadding ? customPadding : '20px'};
`);

const HeaderModal = styled.div.withConfig({
  shouldForwardProp: (prop) => 
    prop !== 'headerColor' && 
    prop !== 'colorText',
})
(({ headerColor, colorText }) => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #E8E8E8;
  background: ${headerColor ? headerColor : 'transparent'};
   border-top-left-radius: 5px; 
  border-top-right-radius: 5px;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: ${colorText ? colorText : '#1766DC'};
  }
`);

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: .3s ease all;
  border-radius: 5px;
  color: #1766DC;

  &:hover{
    background: #F2F2F2;
  }

  svg{
    width: 100%;
    height: 100%;
  }
`;