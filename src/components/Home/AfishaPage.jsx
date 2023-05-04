import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import classes from './AfishaPage.module.css';
import formatDate from '../../utils/formatDate';
import validateFiles from '../../utils/validateFiles';

const uploadFiles = async (id, uploadImages) => {
  try {
    if (!parseInt(id)) throw 'Terminal is not selected!';

    if (!uploadImages.length) throw 'Nothing is selected to upload!';

    const validationRes = validateFiles(uploadImages);

    if (validationRes.failed.length) {
      let errorHtml = '<div class="max-h-[200px] w-full">';
      errorHtml += '<table class="border-2 border-slate-200 min-w-full break-all overflow-y-auto">';
      errorHtml += '<thead class="border-b font-medium">';
      errorHtml += '<tr><th>File</th><th>Error</th></tr></thead><tbody>';

      for (let i = 0; i < validationRes.failed.length; i++) {
        const { file, error } = validationRes.failed[i];

        errorHtml += `<tr class="border-b"><td>${file}</td><td class="min-w-[100px]">${error}</td></tr>`;
      }

      errorHtml += '</tbody></table></div>';

      Swal.fire({
        html: errorHtml,
        icon: 'error',
      });
    }

    if (validationRes.validated.length) {
      const formData = new FormData();
      for (let i = 0; i < validationRes.validated.length; i++) {
        formData.append('file', validationRes.validated[i]);
      }

      const res = await axios({
        method: 'post',
        url: `http://localhost:8080/api/terminal/afisha/upload/${id}`,
        data: formData,
      });

      return res.data;
    }
  } catch (err) {
    Swal.fire('Error', err.response?.data.message || err, 'error');
  }
};

const getAfishes = async (id, page = 1, perPage = 5) => {
  try {
    if (!id) throw 'Terminal is not selected!';

    const { data: res } = await axios({
      method: 'get',
      url: `http://localhost:8080/api/terminal/afisha/getBy/${id}?page=${page}&perPage=${perPage}`,
    });

    return res;
  } catch (err) {
    Swal.fire('Error', err.response?.data.message || err, 'error');
  }
};

const getAllTerminals = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: 'http://localhost:8080/api/terminal/terminals/all',
    });

    return res.data;
  } catch (err) {
    Swal.fire('Error', err.response?.data.message || err, 'error');
  }
};

const deleteAfisha = async (id) => {
  try {
    if (!id) throw 'Terminal is not selected!';

    const res = await axios({
      method: 'delete',
      url: `http://localhost:8080/api/terminal/afisha/del/${id}`,
    });

    return res.data;
  } catch (err) {
    Swal.fire('Error', err.response?.data.message || err, 'error');
  }
};

// *TODO: Рефакторнуть этот кусок говна и разбить его на отдельные компоненты
function AfishaPage({ terminalId, setTerminal = (f) => f }) {
  const [terminals, setTerminals] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const inputRef = useRef();

  useEffect(() => {
    (async () => {
      const res = await getAllTerminals();

      setTerminals(res);
    })();
  }, []);

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

  const onUpload = async () => {
    await uploadFiles(terminalId, uploadImages);

    const res = await getAfishes(terminalId);
    inputRef.current.value = '';

    setPage(res.paginate.currentPage);
    setTotal(res.paginate.lastPage);

    setData(res.data);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.uploadContainer}>
          <select
            name="terminals"
            id="terminal-select"
            onChange={(e) => setTerminal(parseInt(e.target.value))}
            className={classes.terminalSelect}
          >
            <option value={false}>- none -</option>
            {terminals.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <div>
            <input
              type="file"
              multiple="multiple"
              accept=".jpg, .jpeg, .png"
              id="file"
              ref={inputRef}
              onChange={(e) => {
                setUploadImages(e.target.files);
              }}
              className={`${classes.fileInput} focus:border-primary focus:shadow-te-primary`}
            />
            <label htmlFor="file" className={classes.inputLabel} />
          </div>
        </div>
        <button
          className={classes.uploadButton}
          type="button"
          onClick={() => {
            onUpload();
          }}
        >
          Upload
        </button>
      </div>
      <div className="px-2 min-w-full">
        <table className={classes.contentTable}>
          <thead>
            <tr>
              <th>File name</th>
              <th>Creation date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el.id}>
                <td>
                  <a href={`uploadFiles/${terminalId}/${el.path_url}`}>{el.path_url}</a>
                </td>
                <td>{formatDate(el.date_crt)}</td>
                <td>
                  <button
                    type="button"
                    className="rounded-[6px] w-[100px] h-[30px] bg-rose-600 text-white font-semibold"
                    onClick={() => {
                      onDelete(el.id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {total > 1 ? (
        <ReactPaginate
          className="flex w-full justify-end p-4 text-slate-600 font-semibold"
          pageClassName="font-semibold px-2"
          nextClassName="px-4"
          previousClassName="px-4"
          activeClassName="text-amber-600 font-bold"
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
    </>
  );
}

export default AfishaPage;
