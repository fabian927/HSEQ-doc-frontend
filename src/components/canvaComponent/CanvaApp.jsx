import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import ToastApp from '../toastComponent/ToastApp';

const CanvaApp = ({ width = 500, height = 200, onChange }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.strokeStyle = '#1f2937';
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    setCtx(context);
  }, [width, height]);

  const startDrawing = (e) => {
    isDrawing.current = true;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    const image = canvasRef.current.toDataURL();
    setSignatureImage(image);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    ctx.closePath();
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, width, height);
    setSignatureImage(null);
  };

  const saveSignature = () => {
    if (signatureImage && onChange) {
      onChange(signatureImage);
      setToast({type:"success", message: "Firma generada correctamente"})
      ctx.clearRect(0, 0, width, height);
    }
  };

  const getCoordinates = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  return (
    <CanvasContainer>
      <StyledCanvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <ButtonGroup>
        <StyledButton type='button' onClick={clearCanvas}>Limpiar</StyledButton>
        <StyledButton type='button' onClick={saveSignature} disabled={!signatureImage}>
          Guardar
        </StyledButton>
      </ButtonGroup>

      {toast && (
        <ToastApp
          key={toast.type + toast.message}
          type={toast.type}
          message={toast.message}
          position="center"
          duration={3000}
        />
      )}
    </CanvasContainer>
  );
};

export default CanvaApp;

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: fit-content;
`;

const StyledCanvas = styled.canvas`
  border: 2px solid #cbd5e0;
  border-radius: 8px;
  touch-action: none;
  background: #fff;
  cursor: crosshair;
`;

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const PreviewImage = styled.img`
  margin-top: 1rem;
  max-width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
`;