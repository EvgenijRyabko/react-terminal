import React, { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import classes from './App.module.css';

// *Основные цели на данный момент

// ? Компонент LoginForm
// TODO: Реализация авторизации

// ? Компонент AfishaPage
// TODO: Рефакторнуть и разбить на подкомпоненты

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
