import React from 'react';
import classes from './InputAreas.module.css';

function InputAreas({ setLogin = (f) => f, setPassword = (f) => f }) {
  return (
    <div className={classes.inputsSection}>
      <div className={classes.inputContainer}>
        <div className={classes.inputBox}>
          <input
            name="login"
            type="text"
            className="peer"
            required
            minLength={4}
            placeholder="Login"
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.inputBox}>
          <input
            name="password"
            type="password"
            className="peer"
            required
            minLength={4}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default InputAreas;
