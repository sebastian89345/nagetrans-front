import React from 'react';

//Hojas de estilos
import './NavbarLogin.css';

//Imagenes
import logo from '../../../assets/img/logo.png';

//react router dom
import { useNavigate } from "react-router-dom";

function NavbarLogin() {

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/");
  }

  return (
    <div className='login-container-navbar'>
      <div className='login-navbar-flex-container'>
        <img className='login-navbar-logo' src={logo} alt='logo de nagetrans' />
        <p onClick={handleSubmit} className='login-navbar-tiltle'>Inicio</p>
      </div>
    </div>
  )
}

export default NavbarLogin