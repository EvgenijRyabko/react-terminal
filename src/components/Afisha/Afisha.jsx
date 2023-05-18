import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import ContentTable from '../ContentTable/ContentTable';
import classes from './Afisha.module.css';
import formatDate from '../../utils/formatDate';
import Upload from '../Upload/Upload';

const getAfishes = async (id, page = 1, perPage = 5) => {
  try {
    if (!id) throw 'Terminal is not selected!';

    const { data: res } = await axios({
      method: 'get',
      url: `api/terminal/afisha/getBy/${id}?page=${page}&perPage=${perPage}`,
    });

    return res;
  } catch (err) {
    Swal.fire('Error', err?.response?.data.message || err, 'error');
  }
};

const deleteAfisha = async (id) => {
  try {
    if (!id) throw 'Terminal is not selected!';

    const res = await axios({
      method: 'delete',
      url: `api/terminal/afisha/del/${id}`,
    });

    return res.data;
  } catch (err) {
    Swal.fire('Error', err?.response?.data.message || err, 'error');
  }
};

function AfishaPage({ terminalId, setTerminal = (f) => f }) {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  useEffect(() => {
    if (terminalId) {
      (async () => {
        const res = await getAfishes(terminalId, page);

        setPage(res.paginate.currentPage);
        setTotal(res.paginate.lastPage);

        setData(res.data);
      })();
    } else {
      setPage(0);
      setTotal(0);
      setData([]);
    }
  }, [terminalId, page]);

  const onDelete = async (id) => {
    await deleteAfisha(id);

    const res = await getAfishes(terminalId);

    setPage(res.paginate.currentPage);
    setTotal(res.paginate.lastPage);

    setData(res.data);
  };

  return (
    <div className="min-w-full">
      <Upload
        setData={setData}
        setTerminal={setTerminal}
        setPage={setPage}
        setTotal={setTotal}
        getFiles={getAfishes}
        fileTypes=".jpg, .jpeg, .png"
        terminalId={terminalId}
      />
      <ContentTable
        headers={['Название файла', 'Дата создания']}
        dataArray={data.map((el) => ({ ...el, date_crt: formatDate(el.date_crt) }))}
        keys={['path_url', 'date_crt']}
        deleteHandler={onDelete}
      />
      {total > 1 ? (
        <ReactPaginate
          className={classes.paginate}
          pageClassName={classes.paginatePage}
          nextClassName={classes.paginateNext}
          previousClassName={classes.paginatePrevious}
          activeClassName={classes.paginateActive}
          onPageChange={(e) => setPage(e.selected + 1)}
          pageCount={total}
          breakLabel="..."
          nextLabel=">"
          pageRangeDisplayed={3}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      ) : (
        <div />
      )}
    </div>
  );
}

export default AfishaPage;
