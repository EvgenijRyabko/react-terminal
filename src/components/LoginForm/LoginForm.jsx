import React from 'react';
import InputAreas from './InputAreas/InputAreas';
import LoginHead from './LoginHead/LoginHead';
import classes from './LoginForm.module.css';

// *TODO: Реализовать авторизацию через куки. Спросить у Славика про защиту ссылок
function LoginForm({ signIn = (f) => f, setLogin = (f) => f, setPassword = (f) => f }) {
  return (
    <form className={classes.loginForm}>
      <LoginHead />
      <InputAreas setPassword={setPassword} setLogin={setLogin} />
      <div className={classes.buttonContainer}>
        <button type="button" onClick={(e) => signIn(e)}>
          Sign in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
