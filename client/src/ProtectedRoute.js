import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../src/pages/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProtectedRoute({ children }) {
  const { state } = useContext(AuthContext);
  const { user } = state;

  if (!user) {
    // Show toast notification
    toast.error('Please Login To Use Tool', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Adjust the autoClose duration as needed
    });

    // Redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
}
