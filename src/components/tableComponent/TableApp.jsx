import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

const TableApp = ({data}) => {

  const [dataFilter, setDataFilter] = useState([]);

  console.log("Data recibida:", data);

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
  console.log("Data procesada:", dataFilter);

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
                        </tr>
                    </thead>
                    <tbody>
                      {dataFilter.map((row, index) => (
                        <tr key={index}>
                          <td>{row.name}</td>
                          <td>{row.last_name}</td>
                          <td>{row.doc_type}</td>
                          <td>{row.document}</td>
                          <td>{row.phone}</td>
                          <td>{row.email}</td>
                          <td>{row.address}</td>
                          <td>{row.age}</td>
                        </tr>
                      ))}
                    </tbody>
                </StyledTable>
            </TableWrapper>            
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
