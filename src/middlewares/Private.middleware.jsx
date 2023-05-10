import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const [token] = useCookies(['auth-token']);
  if (token['auth-token']) return children;
  return <Navigate to="/login" />;
}

export default PrivateRoute;
