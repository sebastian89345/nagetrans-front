//componentes de react
import React, {useState} from 'react';

// hoja de estilos
import './NavbarHome.css';

// images o iconos cargados desde el assets
import arrow from '../../../assets/img/arrow.png';
import logo from '../../../assets/img/logo.png';
import menu from '../../../assets/img/menu.png';

function NavbarHome({ logout }) {

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
              <div className="dropdown">
                  <p id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='home-navbar-tiltle'>
                    nagetrans@gmail.com <img src={arrow} alt='icono de la flecha' /> 
                  </p>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className='home-logout-container-img form-group'>
                      <img className='home-logout-img' src={logo} alt='logo de nagetrans' />
                    </div>
                    <div className='form-group center-text'>
                      <p className='home-logout-title-email'>nagetrans@gmail.com</p>
                    </div>
                    <div className='form-group center-text'>
                      <p className='home-logout-title-user'>SWT2222</p>
                    </div>
                    <div className='form-group center-text'>
                      <button onClick={logout} className='home-logout-button' type='button' >Cerrar session</button>
                    </div>
                  </div>
              </div>
            </div>
          </div> 
        : <div className='home-mobile-container-navbar'>
            <div className='home-mobile-navbar-flex-container'>
              <img onClick={open} className='home-mobile-navbar-menu' src={menu} alt='imagen del menu' />
              <img className='home-mobile-navbar-logo' src={logo} alt='logo de nagetrans' />
            </div>
          </div>
    }
  </> 
  )
}

export default NavbarHome