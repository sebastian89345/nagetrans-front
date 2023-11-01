// componentes de react
import React, { useState } from "react";

// react-router components
import { useNavigate } from "react-router-dom";

//Estilos css
import './Login.css';

//Componentes reutilizables
import NavbarLogin from "../../components/Navbar/NavbarLogin/NavbarLogin";

// imagenes 
import line from '../../assets/img/line.png';
import van from '../../assets/img/camioneta.png';

function Login() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
    
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      let userInfo = {
        user:'sebastian893',
        password:'sebastian893',
        rol:'Admin'
      }
      console.log(userInfo);  
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate("/home"); 
  };


  return (
    <>
      {width > 992  
      ? <>
          <NavbarLogin />
          <div className="login-card-container container">
              <div className="login-container-flex">
                <div className="container login-position-img-van">
                    <img className="login-img-van" src={van} alt="camioneta que va arriba" />
                  </div>
                  <div className="container login-position-img-line">
                    <img className="login-img-line" src={line} alt="linea que pasa por el fondo" />
                  </div>
                  <div className="login-container-form-one">
                    <p className="login-form-one-title">Nagetrans</p>
                  </div>
                  <div className="login-container-form-two">
                    <div className="login-container-card-two">
                      <div className="form-group">
                        <p className="login-form-two-title">Iniciar sesion</p>
                      </div>
                      <form onSubmit={handleSubmit} component="form">
                        <div className="form-group">
                          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="form-control login-input" placeholder="Usuario" />
                        </div>
                        <div className="form-group">
                          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control login-input" placeholder="Contraseña" />
                        </div>
                        <div className="form-group">
                          <button type="submit" className="login-btn-login btn btn-danger">Ingresar</button>
                        </div>
                        <div className="form-group login-center-title">
                          <p className="login-title-login">¿ Has olvidado la contraseña ?</p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </div>  
        </>
      : <>
        <div className="login-mobile-container-card">
          <div className="login-mobile-card">
            <div className="form-group">
              <img src={van} alt="camioneta" />
            </div>
            <div className="form-group center-text">
              <p className="login-mobile-text">Iniciar session</p>
            </div>
            <form onSubmit={handleSubmit} component="form">
              <div className="form-group">
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className="form-control login-mobile-input" placeholder="Usuario" />
              </div>
              <div className="form-group">
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control login-mobile-input" placeholder="Contraseña" />
              </div>
              <div className="form-group">
                <p className="center-text login-mobile-text">Cambiar contraseña</p>
              </div>
              <div className="form-group">
                <button type="submit" className="login-mobile-button btn btn-danger">Ingresar</button>
              </div>
            </form>
            <div className="form-group">
              <button type="button" className="login-mobile-button btn btn-danger">Inicio</button>
            </div>
          </div>
        </div>        
      </>  
    }
  </>
  )
}

export default Login