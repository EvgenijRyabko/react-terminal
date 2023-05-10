import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

function LoginRoute({ children }) {
  const [token] = useCookies(['auth-token']);
  if (token['auth-token']) return <Navigate to="/home" />;
  return children;
}

export default LoginRoute;
