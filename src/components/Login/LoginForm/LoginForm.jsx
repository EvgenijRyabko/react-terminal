import React from 'react';
import InputAreas from './InputAreas/InputAreas';
import LoginHead from './LoginHead/LoginHead';
import classes from './LoginForm.module.css';

// *TODO: Реализовать авторизацию через куки. Спросить у Славика про защиту ссылок
function LoginForm({ signIn }) {
  return (
    <form onSubmit={signIn} className={classes.loginForm}>
      <LoginHead />
      <InputAreas />
      <div className={classes.buttonContainer}>
        <button type="submit">Sign in</button>
      </div>
    </form>
  );
}

export default LoginForm;
