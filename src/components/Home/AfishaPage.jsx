import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import classes from "./AfishaPage.module.css";

const uploadFiles = async (id, uploadImages) => {
  try {
    if (!id) throw "Terminal is not selected!";

    if (uploadImages.length <= 0) throw "Nothing is selected to upload!";

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
    console.log(new Error(err).message);
  }
};

const getAfishes = async (id) => {
  try {
    if (!id) throw "Terminal is not selected!";

    const { data: result } = await axios({
      method: "get",
      url: `http://localhost:8080/api/terminal/afisha/getBy/${id}`,
    });

    return result.data;
  } catch (err) {
    console.log(new Error(err).message);
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
        const data = await getAfishes(terminalId);

        console.log(data);

        setData(data);
      })();
    }
  }, [terminalId]);

  const onDelete = async (id) => {
    await deleteAfisha(id);

    const data = await getAfishes(terminalId);

    setData(data);
  };

  const onUpload = async () => {
    await uploadFiles(terminalId, uploadImages);

    const data = await getAfishes(terminalId);
    inputRef.current.value = '';

    setData(data);
  };

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
