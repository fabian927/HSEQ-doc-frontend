import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const TableApp = ({data, onDataAction}) => {
  const [dataFilter, setDataFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (data) {
      if (data.persons && Array.isArray(data.persons)) {
        setDataFilter(data.persons);
      }
      else if (data.person && typeof data.person === "object") {
        setDataFilter([data.person]); 
      }
      else {
        setDataFilter([]);
      }
    } else {
      setDataFilter([]); 
    }
  }, [data]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dataFilter.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  const handelEdit = (doc) =>{
    onDataAction({type:"2", action:"Edit", doc: doc});   
  }

  const handelDelete = (id) =>{
    onDataAction({action:"Delete", id: id});   
  }

  return (
    <>
      <Container>
        <TableWrapper>
          <StyledTable responsive="sm" >
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Tipo de Documento</th>
                <th>Documento</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Edad</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.last_name}</td>
                  <td>{row.doc_type}</td>
                  <td>{row.document}</td>
                  <td>{row.phone}</td>
                  <td>{row.email}</td>
                  <td>{row.address}</td>
                  <td>{row.age}</td>
                  <td>
                    <StyledButton title="Editar" onClick={() => handelEdit(row.document)} >
                      <FaEdit />
                    </StyledButton>
                  </td>
                  <td>
                    <StyledButton title="Eliminar" onClick={() => handelDelete(row.id)} >
                      <FaTrash />
                    </StyledButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>  
        <PaginationContainer>
          <RowsPerPageSelector>
            <label>Filas por página:</label>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </RowsPerPageSelector>
          <PaginationButtons>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {Math.ceil(dataFilter.length / rowsPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(dataFilter.length / rowsPerPage)}
            >
              Siguiente
            </button>
          </PaginationButtons>
        </PaginationContainer>          
      </Container> 
    </>
  )
}

export default TableApp

const Container = styled.div`
  margin: 20px; 
  padding: 15px; 
  align-items: center;
  text-align: center; 
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledButton = styled(Button)`
background: none;
  border: none;
  cursor: pointer;
  color: #007bff; 
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: white; 
  }
`;

const StyledTable = styled(Table)`
border-collapse: collapse;
width: 100%;
background-color: white;
border-radius: 10px;
overflow: hidden;

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #343a40;
  color: white;
}

tbody tr:hover {
  background-color: #f1f1f1;
}
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const RowsPerPageSelector = styled.div`
  background-color: white;
  display: inline-block;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  label {
    margin-right: 10px;
  }

  select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const PaginationButtons = styled.div`
  background-color: white;
  display: inline-block;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    margin: 0 10px;
  }
`;
