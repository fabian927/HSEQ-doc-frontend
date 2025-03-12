import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Toast = ({ type, message, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose(); 
      }, duration);
  
      return () => clearTimeout(timer);
    }, [duration, onClose]);
  
    if (!visible) return null;
  
    const toastStyles = {
      success: { backgroundColor: "#4CAF50", icon: "✅" },
      error: { backgroundColor: "#F44336", icon: "❌" },
      loading: { backgroundColor: "#2196F3", icon: "⏳" },
      warning: { backgroundColor: "#FF9800", icon: "⚠️" },
      info: { backgroundColor: "#009688", icon: "ℹ️" },
    };
  
    const { backgroundColor, icon } = toastStyles[type] || {
      backgroundColor: "#333",
      icon: "💡",
    };
  
    return (
      <ToastContainer backgroundColor={backgroundColor}>
        <ToastIcon>{icon}</ToastIcon>
        <span>{message}</span>
      </ToastContainer>
    );
  };
  
  export default Toast;

  const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "backgroundColor",
  })`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  background-color: ${(props) => props.backgroundColor || "#333"};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-in-out;
  display: flex;
  align-items: center;
`;

const ToastIcon = styled.span`
  margin-right: 10px;
  font-size: 20px;
`;