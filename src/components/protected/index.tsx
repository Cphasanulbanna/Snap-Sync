import * as React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

interface IProtectedRoutesProps {
}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (props) => {
    const location = useLocation()
    const isAuth:boolean = false
  return  isAuth ? <Outlet />: <Navigate to="/login" state={{from: location }}/>
};

export default ProtectedRoutes;
