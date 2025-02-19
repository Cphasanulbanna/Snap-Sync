import {  useUserAuth } from '@/context/userAuthContext';
import * as React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

interface IProtectedRoutesProps {
}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (props) => {
    const location = useLocation()
    const {user} = useUserAuth()
  return  user ? <Outlet />: <Navigate to="/login" state={{from: location }}/>
};

export default ProtectedRoutes;
