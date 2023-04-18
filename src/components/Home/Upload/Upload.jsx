import axios from "axios";
import React from "react";
import classes from './Upload.module.css';

const getTerminals = async () => {
    const res = await axios.get();

    return res.data;
}

const Upload = ({setTerminal = (f) => f}) => {
    return (
        <div>
            <select name='terminals' id='terminal-select' onChange={(e) => setTerminal(e.target.value)} className={classes.terminalSelect}>
                <option value={0}>- none -</option>
                <option value={1}>Инфобокс ИПР</option>
                <option value={2}>Инфобокс ФИЗВОСП</option>
                <option value={3}>Инфобокс ИПП</option>
                <option value={4}>Инфобокс ФФ</option>
            </select>
            <input type='file' className={classes.fileInput}/>
            <button className={classes.uploadButton}>Upload</button>
        </div>
    );
}

export default Upload;