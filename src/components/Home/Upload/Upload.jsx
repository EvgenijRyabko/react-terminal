import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import classes from "./Upload.module.css";

const Upload = ({ setTerminal = (f) => f }) => {
  const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios({
        method: "get",
        url: "http://localhost:8080/api/terminal/terminals/all",
      });

      setTerminals(res.data);
    })();
  }, []);

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
            className={`${classes.fileInput} focus:border-primary focus:shadow-te-primary dark:focus:border-primary`}
          />
          <label htmlFor="file" className={classes.inputLabel}></label>
        </div>
      </div>
      <button className={classes.uploadButton}>Upload</button>
    </div>
  );
};

export default Upload;
