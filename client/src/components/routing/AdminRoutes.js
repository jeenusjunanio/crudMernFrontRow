import React from 'react';
import { Router, Navigate, Route } from 'react-router-dom';
const AdminRoutes = ({children}) => {
  return localStorage.getItem("authToken") ? children : <Navigate to="/login" />;
  
};

export default AdminRoutes;
