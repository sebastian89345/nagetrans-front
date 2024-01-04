import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, redirectTo , isAuthenticated }) => {
  if(isAuthenticated){
    return children
  }else{
    return <Navigate to = {"/login"} replace/>
  }
  };

export default PrivateRoute;