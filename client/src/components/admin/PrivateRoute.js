import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
    const stateisAdmin = useSelector((state) => state.userHandler.isAdmin);

    return stateisAdmin ? children : <Navigate to="/login" />;
};
