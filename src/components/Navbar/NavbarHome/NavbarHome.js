//componentes de react
import React, {useState} from 'react';

// hoja de estilos
import './NavbarHome.css';

// images o iconos cargados desde el assets
import arrow from '../../../assets/img/arrow.png';
import logo from '../../../assets/img/logo.png';
import menu from '../../../assets/img/menu.png';
import bellWeb from '../../../assets/img/bx-bell-web.png';
import bellMobile from '../../../assets/img/bx-bell-mobile.png';
import circle from '../../../assets/img/bxs-circle.png';

function NavbarHome({ logout,email,user }) {

    const [width, setWidth] = useState(window.innerWidth);
      
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    const open = () => {
      const offcanvasModal = document.getElementById('offcanvasModal');
      offcanvasModal.style.left = '0';
    }
  
  return (
    <>
      {width > 1200  
        ? <div className='home-container-navbar'>
            <div className='home-navbar-flex-container'>

              <div className='home-navbar-position'>
                <div className="dropdown">
                  <p id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='home-navbar-tiltle'>
                    <img className='home-navbar-img-circle' src={circle} alt='' />
                    <img className='home-navbar-img-bell' src={bellWeb} alt='' />
                  </p>
                  <div className="dropdown-menu dropdown-menu-bell" aria-labelledby="dropdownMenuButton">

                    <div>
                    </div>       

                  </div>
                </div>

                <div className="dropdown">
                  <p id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='home-navbar-tiltle'>
                    {email} <img src={arrow} alt='icono de la flecha' /> 
                  </p>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className='form-group center-text'>
                      <p className='home-logout-title-email'>{email}</p>
                    </div>
                    <div className='form-group center-text'>
                      <p className='home-logout-title-user'>{user}</p>
                    </div>
                    <div className='form-group center-text'>
                      <button onClick={logout} className='home-logout-button' type='button' >Cerrar session</button>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div> 
        : <div className='home-mobile-container-navbar'>
            <div className='home-mobile-navbar-flex-container'>
              <img onClick={open} className='home-mobile-navbar-menu' src={menu} alt='imagen del menu' />

                <div>
                  <img className='home-navbar-img-circle' src={circle} alt='' />
                  <img className='home-navbar-img-bell' src={bellMobile} alt='' />
                </div>
              
            </div>
          </div>
    }
  </> 
  )
}

export default NavbarHome