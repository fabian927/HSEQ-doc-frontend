import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';

const TableReports = ({ data, columns, title = "Tabla", onRowClick }) => {

  const [filtro, setFiltro] = useState('');

  const datosFiltrados = data.filter(item =>
    Object.values(item).some(valor =>
      typeof valor === 'string' &&
      valor.toLowerCase().includes(filtro.toLowerCase())
    )
  );

  return (
    <Contenedor>
      <Titulo>{title}</Titulo>
      <FiltroInput
        type="text"
        placeholder="Buscar..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <DataTable
        columns={columns}
        data={datosFiltrados}
        pagination
        striped
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="300px"
        noDataComponent="No hay datos para mostrar"
        customStyles={customStyles}
        pointerOnHover={true}
        onRowClicked={(row) => {
          console.log('Fila clickeada:', row);
          if (onRowClick) onRowClick(row);
        }}
      />
    </Contenedor>
  )
}

export default TableReports

const customStyles = {
  headCells: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      fontSize: '14px',
    },
  },
  rows: {
    style: {
      minHeight: '48px', // Altura mínima de las filas
    },
  },
};

const Contenedor = styled.div`
  padding: 30px;
  max-width: 1000px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Titulo = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const FiltroInput = styled.input`
  padding: 10px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;