import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Middlewares
import LoginRoute from '../middlewares/Login.middleware';
import PrivateRoute from '../middlewares/Private.middleware';

// Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

function Router() {
  const LoginPage = (
    <LoginRoute>
      <Login />
    </LoginRoute>
  );

  const HomePage = (
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={LoginPage} />
        <Route path="/home" element={HomePage} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
