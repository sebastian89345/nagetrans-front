import React from 'react';
import './NavbarLogin.css';
import logo from '../../../assets/img/logo.png';

function NavbarLogin() {
  return (
    <div className='login-container-navbar'>
      <div className='login-navbar-flex-container'>
        <img className='login-navbar-logo' src={logo} alt='logo de nagetrans' />
        <p className='login-navbar-tiltle'>Inicio</p>
      </div>
    </div>
  )
}

export default NavbarLogin