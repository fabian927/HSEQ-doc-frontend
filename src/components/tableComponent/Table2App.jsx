import React from 'react';
import styled from 'styled-components';

const Table2App = ({data}) => {
  return (
    <TableContainer>
      {data.titulo && <TableTitle> {data.titulo} </TableTitle>}
      <StyledTable>
        <TableHeader>
            <tr>
                {data.encabezados.map((encabezado, index) => (
                    <Th key={index}>{encabezado}</Th>
                ))}
            </tr>
        </TableHeader>
        <tbody>
            {data.valores.map((fila, filaIndex) => (
                <Tr key={filaIndex}>
                    {fila.map((valor, colIndex) => (
                        <Td key={colIndex}>{valor}</Td>
                    ))}
                </Tr>
            ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  )
}

export default Table2App

const TableContainer = styled.div`
    margin: 20px 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TableTitle = styled.h3`
    background-color: #4CAF50;
    color: white;
    padding: 12px;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
    border-radius: 4px 4px 0 0;
    text-align: center;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
`;

const TableHeader = styled.thead`
    background-color: #ccc;
`;

const Th = styled.th`
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
    font-size: 14px;
    text-align: center;
`;

const Td = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    white-space: pre-line;
    font-size: 12px;
`;

const Tr = styled.tr`
    &:nth-child(even){
        background-color: #F9F9F9;
    }

    &:hover {
        background-color: #F1F1F1;
    }
`;