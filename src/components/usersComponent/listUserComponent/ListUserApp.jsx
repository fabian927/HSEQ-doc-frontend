import React, {useState, useCallback} from 'react'
import TableApp from '../../tableComponent/TableApp';
import FilterUserApp from '../filterComponent/FilterUserApp';
import FilterUserControl from '../filterComponent/FilterUserControl';
import styled from 'styled-components';
import UpdateUserApp from '../updateUserComponent/UpdateUserApp';
import DeleteUserApp from '../deleteUserComponent/DeleteUserApp';

const ListUserApp = () => {
  const [filterUser, setFilterUser] = useState({ type: '0', doc: '' });
  const [dataPerson, setDataPerson] = useState(null);
  const [userEdit, setUserEdit] = useState({});
  const [userDelete, setUserDelete] = useState(null);
  const [stateModalUpdate, setStateModalUpdate] = useState(false);
  const [stateModal, setStateModal] = useState(false);

  const onDataFilter = useCallback((dataFilter) => {
    setFilterUser((prevFilter) => ({ ...prevFilter, ...dataFilter }));
  }, []);

  const onResponse = useCallback((response) => {
    const { success, data } = response;
    if (success) {
      setDataPerson(data);
    } else {
      console.error("Error en la respuesta:", response.error);
      setDataPerson(null);
    }
  }, []);

  const onDataAction = useCallback((data) => {
    const { type, action, doc, id } = data;
    if (action === "Edit") {
      setUserEdit({ type, doc });
      setStateModalUpdate(true);
      console.log("doc: ", doc, "type", type);
    } else if (action === "Delete") {
      setStateModal(true);
      setUserDelete({id, doc});
      console.log("Delete to id: ", id);
    }
  }, []);

  const refreshData = useCallback(() =>{
    console.log("entra a refresh");
    setFilterUser({ type: '1' });
    setDataPerson(null);
  });

  return (
    <Container>
      <FilterUserApp onFilter={onDataFilter} />
      <FilterUserControl dataFilter={filterUser} onResponse={onResponse} />
      {dataPerson && <TableApp data={dataPerson} onDataAction={onDataAction} />}
      <UpdateUserApp user={userEdit} stateModalUpdate = {stateModalUpdate} setStateModalUpdate = {setStateModalUpdate} onRefresh ={refreshData} />
      <DeleteUserApp stateModal = {stateModal} setStateModal = {setStateModal} userDelete = {userDelete} onRefresh ={refreshData} />
    </Container>
  );
};

export default ListUserApp

const Container = styled.div`

`;