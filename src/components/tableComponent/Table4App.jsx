import React from 'react';
import styled from 'styled-components';

const Table4App = ({ headers, data }) => {
  return (
    <ContentTable>
      <Table>
        <thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex} gray={rowIndex % 2 === 1}>
              {row.map((cell, cellIndex) => (
                <Td key={cellIndex}>
                  {typeof cell === 'string' || typeof cell === 'number'
                    ? cell
                    : cell} {/* Soporta imágenes o JSX */}
                </Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </ContentTable>
  );
};

export default Table4App

const ContentTable = styled.div`
  display: flex;
  justify-content: center;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  font-size: 12px;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #888;
  padding: 8px;
  text-align: center;
  background-color: #ccc;
  font-weight: bold;
  font-size: 14px;
`;

const Td = styled.td`
  border: 1px solid #888;
  padding: 8px;
  text-align: center;
`;

const Tr = styled.tr.withConfig({
  shouldForwardProp: (prop) => prop !== 'gray',
})`
  background-color: ${({gray}) => gray ? "#f9f9f9" : "white"};
`;