import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './Login.module.css';

const Login = () => {
  const navigation = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    navigation("/home");
  };

  return (
    <div className={ classes.loginContainer }>
      <div className="grid content-end row-auto gap-y-12">
        <div className="grid w-full justify-items-center">
          <div className="relative w-3/6 z-0">
            <input
              name="login"
              type='text'
              className="peer px-2 w-full min-h-[40px] border-2 rounded-xl outline-none bg-transparent focus:bg-white focus:border-blue-600 transform duration-500"
            />
            <label
              for="login"
              className="absolute text-slate-700 left-4 top-1 peer-hover:top-[-30px] peer-focus:top-[-30px] peer-focus:text-blue-600 transform duration-500 -z-10"
            >
              Login
            </label>
          </div>
        </div>
        <div className="grid w-full justify-items-center">
          <div className="relative w-3/6 z-0">
            <input
              name="password"
              type='password'
              className="peer px-2 w-full min-h-[40px] border-2 rounded-xl outline-none bg-transparent focus:bg-white focus:border-blue-600 transform duration-500"
            />
            <label
              for="password"
              className="absolute text-slate-700 left-4 top-1 peer-hover:top-[-30px] peer-focus:top-[-30px] peer-focus:text-blue-600 transform duration-500 -z-10"
            >
              Password
            </label>
          </div>
        </div>
      </div>
      <div className="grid items-center w-full justify-items-center">
        <button
          className="w-1/4 h-[40px] text-slate-100 bg-amber-500 rounded-md shadow-amber-500 shadow-md hover:opacity-90 hover:shadow-[0_5px_20px_#f59e0b] transition duration-500 justify-self-center"
          type="submit"
          onClick={signIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
