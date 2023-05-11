import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import classes from './Upload.module.css';
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
        url: `api/terminal/afisha/upload/${id}`,
        data: formData,
      });

      return res.data;
    }
  } catch (err) {
    Swal.fire('Error', err?.response?.data.message || err, 'error');
  }
};

const getAllTerminals = async () => {
  try {
    const res = await axios({
      method: 'get',
      url: 'api/terminal/terminals/all',
    });

    return res.data;
  } catch (err) {
    Swal.fire('Error', err?.response?.data.message || err, 'error');
  }
};

function Upload({
  setData = (f) => f,
  setTerminal = (f) => f,
  setPage = (f) => f,
  setTotal = (f) => f,
  getFiles = (f) => f,
  fileTypes,
  terminalId,
}) {
  const [upload, setUpload] = useState([]);
  const [terminals, setTerminals] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    (async () => {
      const res = await getAllTerminals();

      setTerminals(res);
    })();
  }, []);

  const onUpload = async () => {
    await uploadFiles(terminalId, upload);

    const res = await getFiles(terminalId);
    inputRef.current.value = '';

    setPage(res.paginate.currentPage);
    setTotal(res.paginate.lastPage);

    setData(res.data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.uploadContainer}>
        <select
          name="terminals"
          id="terminal-select"
          onChange={(e) => setTerminal(parseInt(e.target.value))}
          className={classes.terminalSelect}
        >
          <option value={false} className="text-center">
            - Выберите терминал -
          </option>
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
            accept={fileTypes}
            id="file"
            ref={inputRef}
            onChange={(e) => {
              setUpload(e.target.files);
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
        Загрузить
      </button>
    </div>
  );
}

export default Upload;
