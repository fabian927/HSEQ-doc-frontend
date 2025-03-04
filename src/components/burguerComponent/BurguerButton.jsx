import React from 'react'
import styled from 'styled-components'

const BurguerButton = ({clicked, handleClick}) => {
  
  return (
    <Burguer> 
      <div className="three col">   
        <div
            onClick={handleClick}
            className={`hamburger ${clicked ? 'is-active' : ''}`}
            id="hamburger-1"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>  
    </Burguer>
  )
}

export default BurguerButton

const Burguer = styled.div`

.row .three{
  padding: 80px 30px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #2c3e50;
  color: #ecf0f1;
  text-align: center;
}

.hamburger .line{
  width: 35px;
  height: 4px;
  background-color: #ecf0f1;
  display: block;
  margin: 8px auto;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.hamburger:hover{
  cursor: pointer;
}

.hamburger.is-active .line:nth-child(2){
  opacity: 0;
}

.hamburger.is-active .line:nth-child(1){
  -webkit-transform: translateY(13px) rotate(45deg);
  -ms-transform: translateY(13px) rotate(45deg);
  -o-transform: translateY(13px) rotate(45deg);
  transform: translateY(13px) rotate(45deg);
}

.hamburger.is-active .line:nth-child(3){
  -webkit-transform: translateY(-13px) rotate(-45deg);
  -ms-transform: translateY(-13px) rotate(-45deg);
  -o-transform: translateY(-13px) rotate(-45deg);
  transform: translateY(-13px) rotate(-45deg);
}

`
