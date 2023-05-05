import React from 'react';
import classes from './Upload.module.css';

function Upload() {
  return (
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
  );
}
