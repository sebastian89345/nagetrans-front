import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "../components/router/PrivateRoute";

// vistas
import Index from '../views/index/Index';
import Pqrs from '../views/pqrs/Pqrs';
import Login from '../views/login/Login';
import Home from '../views/home/Home';
import PageNotFound from '../views/page-not-found/PageNotFound';

export const AppRouter = () => {
  const [token, setToken] = useState();
  const infoLogin = useSelector((store) => store.loginReducer);

  useEffect(() => {
    // setToken()  Comentar Despues
    if(infoLogin.data > 0 || infoLogin.data.status === 200) {
      if(infoLogin.data.response.token !== undefined && infoLogin.data.response.token !== "" ){
        setToken(infoLogin.data.response.token);
      }        
    } else {
      setToken(undefined);
    }
  }, [infoLogin]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index token={token} setToken={ (e) => setToken(e) } />} exact />
        <Route path="/pqrs" element={<Pqrs token={token} setToken={ (e) => setToken(e) } />} exact />
        <Route path="/login" element={<Login token={token} setToken={ (e) => setToken(e) } />} exact />
        <Route path="/home" element={<PrivateRoute isAuthenticated={infoLogin.data.response} ><Home /></PrivateRoute>} exact />
        <Route path="*" element={<PageNotFound />} exact />
      </Routes>
    </>
  );
}