import React, {useState, useCallback} from 'react'
import TableApp from '../../tableComponent/TableApp';
import FilterUserApp from '../filterComponent/FilterUserApp';
import FilterUserControl from '../filterComponent/FilterUserControl';
import styled from 'styled-components';
import UpdateUserApp from '../updateUserComponent/UpdateUserApp';

const ListUserApp = () => {
  const [filterUser, setFilterUser] = useState({ type: '0', doc: '' });
  const [dataPerson, setDataPerson] = useState(null);
  const [visibleViews, setVisibleViews] = useState({
    table: false,
    form: false,
  });
  const [userEdit, setUserEdit] = useState({});
  const [userDelete, setUserDelete] = useState(null);

  const onDataFilter = useCallback((dataFilter) => {
    setFilterUser((prevFilter) => ({ ...prevFilter, ...dataFilter }));
  }, []);

  const onResponse = useCallback((response) => {
    const { success, data } = response;
    if (success) {
      setDataPerson(data);
      setVisibleViews({ table: true, form: false });
    } else {
      console.error("Error en la respuesta:", response.error);
      setDataPerson(null);
      setVisibleViews({ table: false, form: false });
    }
  }, []);

  const onDataAction = useCallback((data) => {
    const { type, action, doc } = data;
    if (action === "Edit") {
      setUserEdit({ type, doc });
      setVisibleViews({ table: false, form: true });
      console.log("doc: ", doc, "type", type);
    } else if (action === "Delete") {
      console.log("Delete to id: ", id);
    }
  }, []);

  return (
    <Container>
      {!visibleViews.form && <FilterUserApp onFilter={onDataFilter} />}
      <FilterUserControl dataFilter={filterUser} onResponse={onResponse} />
      {visibleViews.table && <TableApp data={dataPerson} onDataAction={onDataAction} />}
      <UpdateUserApp user={userEdit} visible={visibleViews} />
    </Container>
  );
};

export default ListUserApp

const Container = styled.div`

`