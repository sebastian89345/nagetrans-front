import React from 'react'
import { Navigate , Outlet } from 'react-router-dom';

const PublicValidationFragment = <Outlet />;

export const AuthGuard = () => {
    const user = sessionStorage.getItem('userInfo');
    if( user ){
     return PublicValidationFragment
    } else {
      return <Navigate replace to="login" />
    }
}

export default AuthGuard ;