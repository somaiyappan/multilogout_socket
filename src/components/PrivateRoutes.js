// components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
    var token = localStorage.getItem('token')
    return token ? <Navigate to="/welcome" /> : <Outlet />;
};

export default ProtectedRoute;