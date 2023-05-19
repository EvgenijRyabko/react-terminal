import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Upload from '../Upload/Upload';
import ContentTable from '../ContentTable/ContentTable';
import classes from './PDF.module.css';

function PDF({ terminalId, setTerminal = (f) => f }) {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  return (
    <div>
      <Upload setTerminal={setTerminal} fileTypes=".pdf .PDF" terminalId={terminalId} />
      <ContentTable
        headers={['Название файла', 'Дата создания', 'Кем создан']}
        dataArray={[]}
        keys={['path_url', 'date_crt', 'created']}
        deleteHandler={() => {}}
      />
    </div>
  );
}

export default PDF;
