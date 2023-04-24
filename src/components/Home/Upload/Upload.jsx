import axios from "axios";
import React from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import classes from "./Upload.module.css";

const Upload = ({ terminalId, setTerminal = (f) => f }) => {
  const [terminals, setTerminals] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios({
        method: "get",
        url: "http://localhost:8080/api/terminal/terminals/all",
      });

      setTerminals(res.data);
    })();
  }, []);

  const uploadFiles = useCallback(async (id) => {
    try {
      const formData = new FormData();
      for (let i=0; i< uploadImages.length; i++) {
        formData.append('file', uploadImages[i]);
      }

      console.log(uploadImages);
      console.log(terminalId);

      if (uploadImages) {
        const res = await axios({
          method: "post",
          url: `http://localhost:8080/api/terminal/afisha/upload/${id}`,
          data: formData
        });

        return res.data;
      }
    } catch (err) {
      console.log(new Error(err).message);
    }
  }, [uploadImages, terminalId]);

  return (
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
        type='button'
        onClick={() => {
          uploadFiles(terminalId);
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;
