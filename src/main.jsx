import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import './middlewares/axiosInterceptors';
import Router from './router/Router';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </CookiesProvider>,
);
