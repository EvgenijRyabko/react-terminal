import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { rand } from 'random-bytes-js';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import LoginForm from '../../components/LoginForm/LoginForm';
import classes from '../../components/LoginForm/LoginForm.module.css';

const signIn = async (payload) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth', payload);
    return response.data;
  } catch (e) {
    Swal.fire('Error', e?.response?.data.error || 'Произошла непредвиденная ошибка', 'error');
  }
};

function Login() {
  const [password, setPassword] = useState();
  const [login, setLogin] = useState();

  const navigate = useNavigate();

  const cookies = ['auth-token', 'selected-tab'];
  const idModule = 2;

  const [, setCookie, removeCookie] = useCookies(cookies);

  const encryptPass = (pass = '') => {
    let iv = rand(32);

    // If length bytes > 32 then trim to 32
    if (iv.length > 32) iv = iv.slice(0, 32);

    const AesKey = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APP_API_KEY);
    const byteIv = CryptoJS.enc.Hex.parse(iv);
    const encryptedStringHex = CryptoJS.AES.encrypt(pass, AesKey, {
      iv: byteIv,
      mode: CryptoJS.mode.CBC,
      format: CryptoJS.format.Hex,
    }).ciphertext;

    const hex = CryptoJS.enc.Hex.stringify(byteIv);

    return `${hex}:${encryptedStringHex.toString()}`;
  };

  // signIn :: (Event) -> void
  const onSignIn = async (e) => {
    e.preventDefault();

    // Get data from server
    const { auth_token: token, id_person: idPerson } = await signIn({
      password: encryptPass(password),
      login,
      id_module: idModule,
    });

    // If auth success then redirect to main page
    if (token) {
      for (let i = 0; i < cookies.length; i++) removeCookie(cookies[i], { path: '/' });

      setCookie('auth-token', token, { path: '/' });
      setCookie('id-user', idPerson, { path: '/' });

      navigate('/');
    }
  };

  return (
    <>
      <LoginForm signIn={onSignIn} setPassword={setPassword} setLogin={setLogin} />
      <HelmetProvider>
        <Helmet title="Авторизация" />
      </HelmetProvider>
    </>
  );
}

export default Login;
