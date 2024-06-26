//componentes de react
import React, {useEffect, useState} from 'react';

// hoja de estilos
import './NavbarHome.css';

// images o iconos cargados desde el assets
import arrow from '../../../assets/img/arrow.png';
// import logo from '../../../assets/img/logo.png';
import menu from '../../../assets/img/menu.png';
import bellWeb from '../../../assets/img/bx-bell-web.png';
import bellMobile from '../../../assets/img/bx-bell-mobile.png';
import circle from '../../../assets/img/bxs-circle.png';

function NavbarHome({ logout,email,user,dataNotification }) {

    const [width, setWidth] = useState(window.innerWidth);
    const [showCircle, setShowCircle] = useState(false);    
    
    useEffect(() => {
      if (dataNotification.length > 0) {
        // console.log(dataNotification);
        setShowCircle(true);
      }
    }, [dataNotification])
    
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
                  <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='home-navbar-tiltle'>
                    { showCircle === true ?
                      <img className='home-navbar-img-circle' src={circle} alt='' /> 
                      :
                      <></>
                    }
                    <img className='home-navbar-img-bell' src={bellWeb} alt='' />
                  </div>

                  <div className="dropdown-menu dropdown-menu-bell" aria-labelledby="dropdownMenuButton">
                    { dataNotification.map((item, index) => (
                      <div key={index} className="card border-warning mb-3" >
                        <div className="card-body">
                          <h5 className='text-warning'>{"Placa: " + item.placa}</h5>
                          {item.expireSoat && (
                            <p className='text-dark card-text'>{"Soat:" + item.expireSoat}</p>
                          )}
                          {item.expirationMechanicalTechnician && (
                            <p className='text-dark card-text'>{"Técnico Mecánica: " + item.expirationMechanicalTechnician}</p>
                          )}
                          {item.expirationCardOperations && (
                            <p className='text-dark card-text'>{"T.Operación: " + item.expirationCardOperations}</p>
                          )}
                          {item.expirationSureRccece && (
                            <p className='text-dark card-text'>{"Seguro RCC RCE: " + item.expirationSureRccece}</p>
                          )}
                          {item.expirationExtract && (
                            <p className='text-dark card-text'>{"Extracto: " + item.expirationExtract}</p>
                          )}
                          {item.expirationPreventiveReview && (
                            <p className='text-dark card-text'>{"Preventiva: " + item.expirationPreventiveReview}</p>
                          )}
                          {typeof item.resultOperation !== 'undefined' && (
                            <p className='text-dark card-text'>{"Cambio de aceite: " + item.resultOperation}</p>
                          )}
                        </div>
                      </div>
                    ))}
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
                <div className="dropdown">
                  <div id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='home-navbar-tiltle'>
                    <div>
                      { showCircle === true ?
                        <img className='home-navbar-img-circle' src={circle} alt='' /> 
                        :
                        <></>
                      }
                      <img className='home-navbar-img-bell' src={bellMobile} alt='' />
                    </div>
                  </div>
                  <div className="dropdown-menu dropdown-menu-bell" aria-labelledby="dropdownMenuButton">
                    { dataNotification.map((item, index) => (
                      <div key={index} className="card border-warning mb-3" >
                        <div className="card-body text-warning">
                          <h5>{"Placa: " + item.placa}</h5>
                          {item.expireSoat && (
                            <p className='text-dark card-text'>{"Soat: " + item.expireSoat}</p>
                          )}
                          {item.expirationMechanicalTechnician && (
                            <p className='text-dark card-text'>{"Técnico Mecánica: " + item.expirationMechanicalTechnician}</p>
                          )}
                          {item.expirationCardOperations && (
                            <p className='text-dark card-text'>{"T.Operación: " + item.expirationCardOperations}</p>
                          )}
                          {item.expirationSureRccece && (
                            <p className='text-dark card-text'>{"Seguro RCC RCE: " + item.expirationSureRccece}</p>
                          )}
                          {item.expirationExtract && (
                            <p className='text-dark card-text'>{"Extracto: " + item.expirationExtract}</p>
                          )}
                          {item.expirationPreventiveReview && (
                            <p className='text-dark card-text'>{"Preventiva: " + item.expirationPreventiveReview}</p>
                          )}
                          {typeof item.resultOperation !== 'undefined' && (
                            <p className='text-dark card-text'>{"Cambio de aceite: " + item.resultOperation}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>                  
                </div>
            </div>
          </div>
    }
  </> 
  )
}

export default NavbarHome