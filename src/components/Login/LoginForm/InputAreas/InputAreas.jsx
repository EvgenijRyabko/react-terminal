import React from "react";
import classes from "./InputAreas.module.css";

const InputAreas = () => {
  return (
    <div className={classes.inputsSection}>
      <div className={classes.inputContainer}>
        <div className={classes.inputBox}>
          <input
            name="login"
            type="text"
            className="peer"
            required={true}
            minLength={4}
            placeholder='Login'
          />
        </div>
      </div>
      <div className={classes.inputContainer}>
        <div className={classes.inputBox}>
          <input
            name="password"
            type="password"
            className="peer"
            required={true}
            minLength={4}
            placeholder='Password'
          />
        </div>
      </div>
    </div>
  );
};

export default InputAreas;
