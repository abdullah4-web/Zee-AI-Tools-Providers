import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';


export default function AdminRoute({ children }) {
  const { state } = useContext(AuthContext);
  const { user } = state;
  return user ? children : <Navigate to="/login" />;
}