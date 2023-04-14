import React from "react";
import InputAreas from "./InputAreas/InputAreas";
import LoginHead from "./LoginHead/LoginHead";
import classes from "./LoginForm.module.css";

const LoginForm = ({signIn}) => {
  return (
    <form onSubmit={signIn} className={classes.loginForm}>
        <LoginHead />
        <InputAreas />
        <div className={classes.buttonContainer}>
            <button type="submit">
                Sign in
            </button>
        </div>
    </form>
  );
};

export default LoginForm;
