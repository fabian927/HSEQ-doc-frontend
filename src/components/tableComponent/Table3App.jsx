import React from 'react';
import styled from 'styled-components';

const Table3App = ({ data }) => {
  return (
    <Table>
      <thead>
        {data.headers.map((headerRow, rowIndex) => (
          <Tr key={`header-${rowIndex}`}>
            {headerRow.map((cell, cellIndex) => (
              <Th
                key={`header-cell-${cellIndex}`}
                colSpan={cell.colSpan || 1}
                rowSpan={cell.rowSpan || 1}
              >
                {cell.text}
              </Th>
            ))}
          </Tr>
        ))}
      </thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <Tr key={`body-row-${rowIndex}`} gray={rowIndex % 2 === 1}>
            {row.map((cell, cellIndex) => (
              <Td
                key={`body-cell-${cellIndex}`}
                colSpan={cell.colSpan || 1}
                rowSpan={cell.rowSpan || 1}
              >
                {cell.text}
              </Td>
            ))}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Table3App

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  font-size: 12px;
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
  text-align: justify;
`;

const Tr = styled.tr.withConfig({
  shouldForwardProp: (prop) => prop !== 'gray',
})`
  background-color: ${({gray}) => gray ? "#f9f9f9" : "white"};
`;