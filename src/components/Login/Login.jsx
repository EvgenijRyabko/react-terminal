import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from './LoginForm/LoginForm';
import { Helmet, HelmetProvider } from "react-helmet-async";
import classes from "./Login.module.css";

const Login = () => {
  const navigation = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    navigation("/home");
  };

  return (
    <>
      <LoginForm signIn={ signIn }/>
      <HelmetProvider>
        <Helmet 
          title="Авторизация"/>
      </HelmetProvider>
    </>
  );
};

export default Login;
