import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import classes from "./AfishaPage.module.css";

const uploadFiles = async (id, uploadImages) => {
  try {
    if (!parseInt(id)) throw "Terminal is not selected!";

    if (!uploadImages.length) throw "Nothing is selected to upload!";

    const formData = new FormData();
    for (let i = 0; i < uploadImages.length; i++) {
      formData.append("file", uploadImages[i]);
    }

    const res = await axios({
      method: "post",
      url: `http://localhost:8080/api/terminal/afisha/upload/${id}`,
      data: formData,
    });

    return res.data;
  } catch (err) {
    alert(err.response?.data.message || err);
  }
};

const getAfishes = async (id, page = 1, limit = 5) => {
  try {
    if (!parseInt(id)) throw "Terminal is not selected!";

    const { data: result } = await axios({
      method: "get",
      url: `http://localhost:8080/api/terminal/afisha/getBy/${id}?page=${page}&limit=${limit}`,
    });

    return result;
  } catch (err) {
    alert(err.response?.data.message || err);
  }
};

const getAllTerminals = async () => {
  try {
    const res = await axios({
      method: "get",
      url: "http://localhost:8080/api/terminal/terminals/all",
    });

    return res.data;
  } catch (error) {
    console.log(new Error(error).message);
  }
};

const deleteAfisha = async (id) => {
  try {
    if (!id) throw "Terminal is not selected!";

    const res = await axios({
      method: "delete",
      url: `http://localhost:8080/api/terminal/afisha/del/${id}`,
    });

    return res.data;
  } catch (e) {
    console.log(new Error(e).message);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString("ru-RU").replace(",", "");
};

// *TODO: Рефакторнуть этот кусок говна и разбить его на отдельные компоненты
// *TODO: Реализовать пагинацию
const AfishaPage = ({ terminalId, setTerminal = (f) => f }) => {
  const [terminals, setTerminals] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    (async () => {
      const data = await getAllTerminals();

      setTerminals(data);
    })();
  }, []);

  useEffect(() => {
    if (terminalId) {
      (async () => {
        const res = await getAfishes(terminalId);

        console.log(res);

        setData(res.data);
        setPage(1);
        setNextPage(res?.next?.page);
        setPreviousPage(res?.previous?.page);
      })();
    }
  }, [terminalId]);

  const onDelete = async (id) => {
    await deleteAfisha(id);

    const res = await getAfishes(terminalId);

    setData(res.data);
    setNextPage(res.next.page);
    setPreviousPage(res.previous.page);
  };

  const onUpload = async () => {
    await uploadFiles(terminalId, uploadImages);

    const res = await getAfishes(terminalId);
    inputRef.current.value = "";

    setData(res.data);
    setNextPage(res.next.page);
    setPreviousPage(res.previous.page);
  };

  const onPrevious = async () => {
    if (previousPage){
      const res = await getAfishes(terminalId, previousPage);

      console.log(res);

      setData(res.data);
      setPage(previousPage);
      setNextPage(res?.next.page);
      setPreviousPage(res?.previous.page);
    }
  }

  const onNext = async () => {
    if (nextPage) {
      const res = await getAfishes(terminalId, nextPage);

      console.log(res);

      setData(res.data);
      setPage(nextPage);
      setNextPage(res?.next.page)
      setPreviousPage(res?.previous.page);
    }
  }

  console.log(`previous: ${previousPage}`);
  console.log(`next: ${nextPage}`);
  console.log(`current: ${page}`);


  return (
    <>
      <div className={classes.container}>
        <div className={classes.uploadContainer}>
          <select
            name="terminals"
            id="terminal-select"
            onChange={(e) => setTerminal(e.target.value)}
            className={classes.terminalSelect}
          >
            <option value={0}>- none -</option>
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
              id="file"
              ref={inputRef}
              onChange={(e) => {
                setUploadImages(e.target.files);
              }}
              className={`${classes.fileInput} focus:border-primary focus:shadow-te-primary dark:focus:border-primary`}
            />
            <label htmlFor="file" className={classes.inputLabel}></label>
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
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden p-2">
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
                      <td>{el.path_url}</td>
                      <td>{formatDate(el.date_crt)}</td>
                      <td>
                        <button
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
                  {data.length ? (
                    <tr className={classes.paginationRow}>
                      <td>
                        <button onClick={() => onPrevious()}>
                          {previousPage?"<-":''}
                        </button>
                      </td>
                      <td>{page}</td>
                      <td>
                        <button onClick={() => onNext()}>
                          {nextPage?"->":''}
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AfishaPage;
