import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import classes from './App.module.css';

// *Основные цели на данный момент

// ? Компонент LoginForm
// TODO: Реализация авторизации

function App() {
  return (
    <div className={classes.app}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
