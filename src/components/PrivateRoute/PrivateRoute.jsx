import React from "react";
import { useSelector } from "react-redux";
import {Navigate} from 'react-router-dom';
import {getUser} from '../../store/selectors'



export const PrivateRoute = ({ children }) => {
    const user = useSelector(getUser);
    const role = user.role;

    return role === 'admin' ? children : <Navigate to="/courses" />;
};