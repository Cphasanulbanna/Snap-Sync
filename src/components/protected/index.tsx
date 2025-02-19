import { getAuth } from 'firebase/auth';
import * as React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth"

const ProtectedRoutes: React.FunctionComponent = () => {
    const location = useLocation()
    const auth  =getAuth()
    const [user, loading] = useAuthState(auth)

    if(loading) {
      return <div>Loading...</div>
    }

  return  user ? <Outlet />: <Navigate to="/login" state={{from: location }}/>
};

export default ProtectedRoutes;
