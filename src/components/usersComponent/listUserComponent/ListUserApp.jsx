import React, {useState, useCallback} from 'react'
import TableApp from '../../tableComponent/TableApp';
import FilterUserApp from '../filterComponent/FilterUserApp';
import FilterUserControl from '../filterComponent/FilterUserControl';
import styled from 'styled-components';

const ListUserApp = () => {

  const [filterUser, setFilterUser] = useState({ type: '0', doc: '' });
  const [dataPerson, setDataPerson] = useState(null);
  const [visible, setVisible] = useState(false);

  const onDataFilter = useCallback((dataFilter) => {
    setFilterUser((prevFilter) => ({ ...prevFilter, ...dataFilter }));
  }, []);

  const onResponse = useCallback((response) => {
    const { success, data } = response;
    if (success) {
      setDataPerson(data);
      setVisible(true);
    } else {
      console.error("Error en la respuesta:", response.error);
      setDataPerson(null); 
    }
  }, []);

  return (
    <Container>
      <FilterUserApp onFilter={onDataFilter} />
      <FilterUserControl dataFilter={filterUser} onResponse={onResponse}/>
      {visible && <TableApp data={dataPerson} />}
    </Container>
  )
}

export default ListUserApp

const Container = styled.div`

`