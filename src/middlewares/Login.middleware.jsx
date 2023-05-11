import React from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';

function LoginRoute({ children }) {
  const cookies = new Cookies();
  const token = cookies.get('auth-token');
  if (token) return <Navigate to="/home" />;
  return children;
}

export default LoginRoute;
